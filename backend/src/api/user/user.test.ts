import request from 'supertest';
import app from '../../app';
import jwt from 'jsonwebtoken';

/**
 * LOGIN TEST
 */

describe('POST /api/v1/user/login', () => {
  it('should return a JWT token when provided with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'raymart.sarmiento23@outlook.com',
        password: 'test',
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  
  it('should return 401 when provided with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
  
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Incorrect email or password');
  });
  
  it('should return 400 when provided with incomplete data', async () => {
    const response = await request(app)
      .post('/api/v1/user/login')
      .send({
        email: 'test@example.com',
      });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Please provide both email and password');
  });
});
  
/**
   * GET PROFILE TEST
   */
describe('GET /api/v1/user/profile', () => {
  it('should return the user profile when authenticated', async () => {
    // Assuming you have a valid JWT token for authentication
    const token = jwt.sign({ email: 'raymart.sarmiento23@outlook.com', name: 'Raymart Sarmiento' }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' });
  
    const response = await request(app)
      .get('/api/v1/user/profile')
      .set('Cookie', [`jwt=${token}`]);
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    // Add more assertions for other properties in the user profile
  });
  
  it('should return 401 when not authenticated', async () => {
    const response = await request(app)
      .get('/api/v1/user/profile');
  
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Not authorized no token');
  });
});

/**
 * REGISTER
 */
describe('POST /api/v1/user/register', () => {
  it('should return 400 if the email is invalid', async () => {
    const invalidEmail = 'invalid-email';

    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        name: 'Test User',
        email: invalidEmail,
        birth_date: '1/1/2000',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email address');
  });

  it('should return 400 if the phone number is invalid', async () => {
    const invalidPhoneNumber = '123'; // Example of an invalid phone number

    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        contact: invalidPhoneNumber,
        birth_date: '1/1/2000',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid phone number');
  });

  it('should return 409 if the email already exists in the database', async () => {
    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        name: 'Test User',
        email: 'raymart.sarmiento23@outlook.com',
        birth_date: '1/1/2000',
        password: 'password123',
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 400 if any required field is missing', async () => {
    const response = await request(app)
      .post('/api/v1/user/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        // Missing birth_date, password
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please provide all required fields');
  });
});