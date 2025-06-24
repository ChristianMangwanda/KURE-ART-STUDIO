import { NextRequest } from 'next/server';
import { 
  createErrorResponse,
  createSuccessResponse,
  logRequest,
  getEnvironmentConfig 
} from '@/lib/utils';
import { ContactFormData } from '@/data/types';

// POST /api/contact - Handle contact form submissions
export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('POST', '/api/contact', userAgent);

    const body = await request.json();
    
    // Basic validation
    const errors: string[] = [];
    
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push('Valid email is required');
    }
    
    if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    }
    
    if (errors.length > 0) {
      return createErrorResponse(
        `Validation failed: ${errors.join(', ')}`,
        400
      );
    }

    const contactData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
      phone: body.phone?.trim() || undefined,
      subject: body.subject?.trim() || 'General Inquiry'
    };

    // Generate submission ID
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create submission record
    const submission = {
      id: submissionId,
      ...contactData,
      submittedAt: new Date().toISOString(),
      userAgent: userAgent,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown',
      status: 'received'
    };

    // Log the submission (in development)
    const config = getEnvironmentConfig();
    if (config.isDevelopment) {
      // Development logging - removed for production
      // console.log('📧 Contact Form Submission:', {
      //   id: submission.id,
      //   name: contactData.name,
      //   email: contactData.email,
      //   subject: contactData.subject,
      //   messageLength: contactData.message.length,
      //   submittedAt: submission.submittedAt
      // });
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Integrate with CRM system
    // 5. For AWS deployment:
    //    - Use SES for email sending
    //    - Store in DynamoDB or RDS
    //    - Trigger Lambda function for processing
    
    await processContactSubmission(submission);

    const response = {
      success: true,
      data: {
        submissionId: submission.id,
        submittedAt: submission.submittedAt,
        message: 'Thank you for your message. We\'ll get back to you within 24 hours.'
      },
      metadata: {
        estimatedResponseTime: '24 hours',
        supportEmail: config.emailFrom
      }
    };

    return Response.json(response, { status: 201 });

  } catch (error) {
    // Keep error logging for debugging
    console.error('Error in POST /api/contact:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// GET /api/contact - Get contact information and form configuration
export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    logRequest('GET', '/api/contact', userAgent);

    const config = getEnvironmentConfig();

    const contactInfo = {
      success: true,
      data: {
        email: {
          general: 'hello@kuraeartstudio.com',
          artists: 'artists@kuraeartstudio.com',
          support: 'support@kuraeartstudio.com'
        },
        phone: '+263 123 456 789', // Placeholder Zimbabwe number
        address: {
          street: '123 Art Avenue',
          city: 'Harare',
          country: 'Zimbabwe',
          postalCode: '12345'
        },
        hours: {
          monday: '9:00 AM - 5:00 PM',
          tuesday: '9:00 AM - 5:00 PM',
          wednesday: '9:00 AM - 5:00 PM',
          thursday: '9:00 AM - 5:00 PM',
          friday: '9:00 AM - 5:00 PM',
          saturday: '10:00 AM - 2:00 PM',
          sunday: 'Closed'
        },
        social: {
          facebook: 'https://facebook.com/kuraeartstudio',
          instagram: 'https://instagram.com/kuraeartstudio',
          twitter: 'https://twitter.com/kuraeartstudio'
        },
        formConfig: {
          maxMessageLength: 1000,
          requiredFields: ['name', 'email', 'message'],
          subjectOptions: [
            'General Inquiry',
            'Artist Application',
            'Purchase Inquiry',
            'Technical Support',
            'Partnership Opportunity',
            'Press/Media',
            'Other'
          ]
        }
      },
      metadata: {
        timezone: 'Africa/Harare',
        responseTime: '24 hours',
        supportedLanguages: ['English', 'Shona', 'Ndebele']
      }
    };

    return Response.json(contactInfo);

  } catch (error) {
    // Keep error logging for debugging
    console.error('Error in GET /api/contact:', error);
    return createErrorResponse('Internal server error', 500);
  }
}

// Helper function to process contact submissions
async function processContactSubmission(submission: Record<string, unknown>) {
  const config = getEnvironmentConfig();

  try {
    // In development, just log
    if (config.isDevelopment) {
      // Development logging - removed for production
      // console.log('📝 Processing contact submission:', submission.id);
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 100));
      return;
    }

    // In production, this would:
    // 1. Save to database (DynamoDB/RDS)
    // 2. Send email via SES
    // 3. Trigger other workflows

    // AWS SES Email Example (commented out for offline mode):
    /*
    const sesParams = {
      Source: config.emailFrom,
      Destination: {
        ToAddresses: ['admin@kuraeartstudio.com']
      },
      Message: {
        Subject: {
          Data: `New Contact Form: ${submission.subject}`
        },
        Body: {
          Text: {
            Data: `
              Name: ${submission.name}
              Email: ${submission.email}
              Phone: ${submission.phone || 'Not provided'}
              Subject: ${submission.subject}
              
              Message:
              ${submission.message}
              
              Submitted: ${submission.submittedAt}
              IP: ${submission.ip}
            `
          }
        }
      }
    };
    
    await ses.sendEmail(sesParams).promise();
    */

    // DynamoDB Save Example (commented out for offline mode):
    /*
    const dynamoParams = {
      TableName: 'contact-submissions',
      Item: submission
    };
    
    await dynamodb.put(dynamoParams).promise();
    */

  } catch (error) {
    console.error('Error processing contact submission:', error);
    // In production, you might want to queue for retry
  }
} 