export default class UserResponse {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly emailVerified: boolean,
    public readonly role: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
