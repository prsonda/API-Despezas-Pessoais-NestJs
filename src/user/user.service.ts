import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto, response: Response) {
    const { avatar, ...dataUser } = createUserDto;

    const avatarData = {};

    const userExists = await prisma.users.findUnique({
      where: {
        email: dataUser.email,
      },
    });

    if (userExists) {
      return response.status(409).json({
        message: 'User already exists',
      });
    }

    return await prisma.users.create({
      data: dataUser,
    });
  }

  async findAll() {
    return prisma.users.findMany();
  }

  async findOne(id: number) {
    return prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { avatar, ...dataUser } = updateUserDto;

    const avatarData = {};

    return prisma.users.update({
      where: {
        id: id,
      },
      data: dataUser,
    });
  }

  remove(id: number) {
    return prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
