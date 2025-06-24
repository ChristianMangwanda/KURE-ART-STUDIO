// AWS Configuration and Deployment Utilities for Kure Art Studio

export interface AWSConfig {
  region: string;
  dynamodb: {
    tables: {
      artworks: string;
      artists: string;
      contacts: string;
      orders: string;
    };
  };
  s3: {
    bucket: string;
    region: string;
  };
  ses: {
    region: string;
    fromEmail: string;
  };
  lambda: {
    stage: string;
  };
}

export const getAWSConfig = (): AWSConfig => ({
  region: process.env.AWS_REGION || 'us-east-1',
  dynamodb: {
    tables: {
      artworks: process.env.DYNAMODB_TABLE_ARTWORKS || 'kure-artworks',
      artists: process.env.DYNAMODB_TABLE_ARTISTS || 'kure-artists',
      contacts: process.env.DYNAMODB_TABLE_CONTACTS || 'kure-contacts',
      orders: process.env.DYNAMODB_TABLE_ORDERS || 'kure-orders'
    }
  },
  s3: {
    bucket: process.env.S3_BUCKET_NAME || 'kure-art-studio-assets',
    region: process.env.AWS_REGION || 'us-east-1'
  },
  ses: {
    region: process.env.AWS_REGION || 'us-east-1',
    fromEmail: process.env.EMAIL_FROM || 'hello@kureartstudio.com'
  },
  lambda: {
    stage: process.env.LAMBDA_STAGE || 'dev'
  }
});

// DynamoDB Table Schemas for AWS deployment
export const DynamoDBSchemas = {
  artworks: {
    TableName: 'kure-artworks',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'artistId', AttributeType: 'S' },
      { AttributeName: 'category', AttributeType: 'S' },
      { AttributeName: 'createdAt', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'artistId-createdAt-index',
        KeySchema: [
          { AttributeName: 'artistId', KeyType: 'HASH' },
          { AttributeName: 'createdAt', KeyType: 'RANGE' }
        ],
        Projection: { ProjectionType: 'ALL' }
      },
      {
        IndexName: 'category-createdAt-index',
        KeySchema: [
          { AttributeName: 'category', KeyType: 'HASH' },
          { AttributeName: 'createdAt', KeyType: 'RANGE' }
        ],
        Projection: { ProjectionType: 'ALL' }
      }
    ]
  },
  
  artists: {
    TableName: 'kure-artists',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'verified', AttributeType: 'S' },
      { AttributeName: 'createdAt', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'verified-createdAt-index',
        KeySchema: [
          { AttributeName: 'verified', KeyType: 'HASH' },
          { AttributeName: 'createdAt', KeyType: 'RANGE' }
        ],
        Projection: { ProjectionType: 'ALL' }
      }
    ]
  },

  contacts: {
    TableName: 'kure-contacts',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'submittedAt', AttributeType: 'S' },
      { AttributeName: 'status', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'status-submittedAt-index',
        KeySchema: [
          { AttributeName: 'status', KeyType: 'HASH' },
          { AttributeName: 'submittedAt', KeyType: 'RANGE' }
        ],
        Projection: { ProjectionType: 'ALL' }
      }
    ]
  }
};

// Lambda function configurations for AWS deployment
export const LambdaConfigurations = {
  artworksAPI: {
    FunctionName: 'kure-artworks-api',
    Runtime: 'nodejs18.x',
    Handler: 'index.handler',
    Environment: {
      Variables: {
        DYNAMODB_TABLE_ARTWORKS: '${self:custom.artworksTable}',
        DYNAMODB_TABLE_ARTISTS: '${self:custom.artistsTable}',
        S3_BUCKET: '${self:custom.s3Bucket}'
      }
    },
    Events: [
      {
        http: {
          path: 'artworks',
          method: 'get',
          cors: true
        }
      },
      {
        http: {
          path: 'artworks',
          method: 'post',
          cors: true
        }
      },
      {
        http: {
          path: 'artworks/{id}',
          method: 'get',
          cors: true
        }
      }
    ]
  },

  artistsAPI: {
    FunctionName: 'kure-artists-api',
    Runtime: 'nodejs18.x',
    Handler: 'index.handler',
    Environment: {
      Variables: {
        DYNAMODB_TABLE_ARTISTS: '${self:custom.artistsTable}',
        DYNAMODB_TABLE_ARTWORKS: '${self:custom.artworksTable}'
      }
    },
    Events: [
      {
        http: {
          path: 'artists',
          method: 'get',
          cors: true
        }
      },
      {
        http: {
          path: 'artists/{id}',
          method: 'get',
          cors: true
        }
      }
    ]
  },

  contactAPI: {
    FunctionName: 'kure-contact-api',
    Runtime: 'nodejs18.x',
    Handler: 'index.handler',
    Environment: {
      Variables: {
        DYNAMODB_TABLE_CONTACTS: '${self:custom.contactsTable}',
        SES_FROM_EMAIL: '${self:custom.fromEmail}'
      }
    },
    Events: [
      {
        http: {
          path: 'contact',
          method: 'post',
          cors: true
        }
      }
    ]
  }
};

// CloudFormation resources for full AWS stack
export const CloudFormationResources = {
  // S3 Bucket for asset storage
  AssetsBucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: '${self:custom.s3Bucket}',
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            MaxAge: 3000
          }
        ]
      }
    }
  },

  // CloudFront Distribution
  CloudFrontDistribution: {
    Type: 'AWS::CloudFront::Distribution',
    Properties: {
      DistributionConfig: {
        Origins: [
          {
            Id: 'S3Origin',
            DomainName: '${self:custom.s3Bucket}.s3.amazonaws.com',
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ],
        DefaultCacheBehavior: {
          TargetOriginId: 'S3Origin',
          ViewerProtocolPolicy: 'redirect-to-https',
          AllowedMethods: ['GET', 'HEAD'],
          CachedMethods: ['GET', 'HEAD'],
          Compress: true
        },
        Enabled: true,
        DefaultRootObject: 'index.html'
      }
    }
  },

  // SES Email Templates
  ContactFormTemplate: {
    Type: 'AWS::SES::Template',
    Properties: {
      TemplateName: 'kure-contact-form',
      Subject: 'New Contact Form Submission - Kure Art Studio',
      HtmlPart: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Subject:</strong> {{subject}}</p>
        <p><strong>Message:</strong></p>
        <p>{{message}}</p>
        <p><strong>Submitted:</strong> {{submittedAt}}</p>
      `,
      TextPart: `
        New Contact Form Submission
        
        Name: {{name}}
        Email: {{email}}
        Subject: {{subject}}
        
        Message:
        {{message}}
        
        Submitted: {{submittedAt}}
      `
    }
  }
};

// Deployment instructions and examples
export const DeploymentGuide = {
  amplify: {
    description: 'Deploy using AWS Amplify for managed fullstack hosting',
    steps: [
      '1. Install AWS Amplify CLI: npm install -g @aws-amplify/cli',
      '2. Initialize Amplify: amplify init',
      '3. Add API: amplify add api (choose REST)',
      '4. Add storage: amplify add storage (choose DynamoDB)',
      '5. Deploy: amplify push',
      '6. Configure environment variables in Amplify console'
    ],
    files: {
      'amplify/backend/api/kureartstudio/template.json': 'CloudFormation template for API Gateway',
      'amplify/backend/storage/kureartstudio/template.json': 'CloudFormation template for DynamoDB'
    }
  },

  serverless: {
    description: 'Deploy using Serverless Framework for Lambda/API Gateway',
    steps: [
      '1. Install Serverless: npm install -g serverless',
      '2. Create serverless.yml configuration',
      '3. Configure AWS credentials: serverless config credentials',
      '4. Deploy: serverless deploy',
      '5. Monitor: serverless logs -f functionName'
    ],
    configExample: {
      service: 'kure-art-studio-api',
      provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        region: 'us-east-1',
        environment: {
          DYNAMODB_TABLE_ARTWORKS: '${self:custom.artworksTable}',
          DYNAMODB_TABLE_ARTISTS: '${self:custom.artistsTable}'
        }
      }
    }
  },

  ecs: {
    description: 'Deploy using AWS ECS for containerized deployment',
    steps: [
      '1. Create Dockerfile for Next.js application',
      '2. Build and push image to ECR',
      '3. Create ECS cluster and task definition',
      '4. Configure Application Load Balancer',
      '5. Set up auto-scaling and monitoring'
    ]
  }
}; 