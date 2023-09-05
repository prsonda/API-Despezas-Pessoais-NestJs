import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto, response: Response) {
    const { avatar, ...dataUser } = createUserDto;

    const avatarData = {
      location: avatar?.location || '',
      name: avatar?.name || '',
      size: avatar?.size || 0,
      key: avatar?.key || '',
    };

    const userData = {
      ...dataUser,
      avatar: avatarData,
    };

    const userExists = prisma.users.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (userExists) {
      return response.status(409).json({
        message: 'User already exists',
      });
    }

    return prisma.users.create({
      data: userData,
    });
  }

  findAll() {
    return prisma.users.findMany();
  }

  findOne(id: number) {
    return prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { avatar, ...dataUser } = updateUserDto;

    const avatarData = {
      location: avatar?.location || '',
      name: avatar?.name || '',
      size: avatar?.size || 0,
      key: avatar?.key || '',
    };

    const userData = {
      ...dataUser,
      avatar: avatarData,
    };

    return prisma.users.update({
      where: {
        id: id,
      },
      data: userData,
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