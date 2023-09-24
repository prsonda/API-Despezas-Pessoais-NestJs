import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      const { avatar, ...dataUser } = createUserDto;

      const passwordHash = await bcrypt.hash(dataUser.password, 10);

      const userExists = await prisma.users.findUnique({
        where: {
          email: dataUser.email,
        },
      });

      if (userExists) {
        throw new Error('409: Usuário já cadastrado!');
      }

      const user = await prisma.users.create({
        data: {
          ...dataUser,
          password: passwordHash,
        },
      });

      return user;
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar usuário!');
    }
  }

  async findAll() {
    return await prisma.users.findMany();
  }

  async findOne(id: number) {
    const userExists = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      return {
        message: 'User not found',
      };
    }

    return await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { avatar, ...dataUser } = updateUserDto;

    const userExists = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      return {
        message: 'User not found',
      };
    }

    const passwordHash = await bcrypt.hash(dataUser.password, 10);

    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        ...dataUser,
        password: passwordHash,
      },
    });

    return;
  }

  async remove(id: number) {
    const userExists = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      return {
        message: 'User not found',
      };
    }

    await prisma.users.delete({
      where: {
        id: id,
      },
    });

    return;
  }
}
