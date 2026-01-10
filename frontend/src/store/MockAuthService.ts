import { User, LoginCredentials, RegisterCredentials } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
let mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@example.com',
    fullName: 'Demo User',
    avatar: null,
    createdAt: new Date('2026-01-01T09:00:00Z'),
    lastLoginAt: new Date('2026-01-02T08:00:00Z'),
  },
  {
    id: 'user-2',
    email: 'john@example.com',
    fullName: 'John Doe',
    avatar: null,
    createdAt: new Date('2026-01-01T10:00:00Z'),
    lastLoginAt: new Date('2026-01-01T15:30:00Z'),
  },
];

export class MockAuthService {
  // Mock login function
  static async login(credentials: LoginCredentials): Promise<User> {
    await delay(1000); // Simulate 1s network delay

    const user = mockUsers.find(
      user => user.email === credentials.email
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    user.lastLoginAt = new Date();
    return { ...user };
  }

  // Mock register function
  static async register(credentials: RegisterCredentials): Promise<User> {
    await delay(1000); // Simulate 1s network delay

    // Check if user already exists
    const existingUser = mockUsers.find(
      user => user.email === credentials.email
    );

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      fullName: credentials.fullName,
      avatar: null,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    mockUsers.push(newUser);
    return { ...newUser };
  }

  // Mock logout function
  static async logout(): Promise<void> {
    await delay(500); // Simulate small delay
    // In a real app, this would clear tokens, etc.
  }

  // Mock verify token function
  static async verifyToken(): Promise<User | null> {
    await delay(300); // Simulate verification delay
    // In a real app, this would verify the authentication token
    // For mock purposes, we'll return the first user
    return mockUsers[0] ? { ...mockUsers[0] } : null;
  }
}