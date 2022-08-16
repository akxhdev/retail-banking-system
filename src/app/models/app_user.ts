export class AppUser {
  constructor(
    public userId: string,
    public name: string,
    public password: string,
    public authToken: string,
    public role: string
  ) {}
}
