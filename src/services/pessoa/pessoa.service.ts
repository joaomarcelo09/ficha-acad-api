import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TelefoneDto } from '../telefone/dto/telefone-dto';

@Injectable()
export class PessoaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    body_nome: string,
    tx: any,
    relation: {
      id_email: number;
      id_telefone: number;
    },
  ) {
    const prisma = tx ?? this.prisma;
    const email = await prisma.pessoa.create({
      data: {
        id_email: relation.id_email,
        id_telefone: relation.id_telefone,
        nome: body_nome,
      },
    });

    return email;
  }
  async update(
    body: {
      nome: string;
      id: number;
    },
    tx: any,
    relation?: {
      id_email: number;
      id_telefone: number;
    },
  ) {
    const prisma = tx ?? this.prisma;
    const pessoa = await prisma.pessoa.update({
      where: {
        id: body.id,
      },
      data: {
        nome: body.nome,
        id_telefone: relation.id_telefone,
        id_email: relation.id_email
      }
    });

    return pessoa;
  }
}
