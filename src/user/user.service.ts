import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto, response: Response) {
    const { avatar, ...dataUser } = createUserDto;

    const passwordHash = await bcrypt.hash(dataUser.password, 10);

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
      data: {
        ...dataUser,
        password: passwordHash,
      },
    });
  }

  async findAll() {
    return await prisma.users.findMany();
  }

  async findOne(id: number) {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { avatar, ...dataUser } = updateUserDto;

    const passwordHash = await bcrypt.hash(dataUser.password, 10);

    return await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        ...dataUser,
        password: passwordHash,
      },
    });
  }

  async remove(id: number) {
    return await prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
