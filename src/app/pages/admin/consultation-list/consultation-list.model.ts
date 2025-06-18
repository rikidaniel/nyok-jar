export class ConsultationListModel{
  id: string;
  name: string;
  email: string;
  needs: string;
  createdAt: string;

  constructor(
    id: string,
    name: string,
    email: string,
    needs: string,
    createdAt: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.needs = needs;
    this.createdAt = createdAt
  }
}
