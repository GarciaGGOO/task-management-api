export class TaskDto {
  id: number;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface FindAllParameters {
  title?: string;
  status?: string;
}
