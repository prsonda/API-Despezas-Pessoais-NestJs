import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData: CreateUserDto = {
        name: 'Test User',
        email: 'email@email.com',
        password: 'password123',
        avatar: 'https://example.com/avatar.png',
      };

      const createdUser = {
        id: 1,
        ...userData,
        password: 'hashedPassword',
      };

      const req = userData;

      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
      } as any;

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser as any);

      await controller.create(req, res);

      expect(userService.create).toHaveBeenCalledWith(userData);
      expect(createdUser.id).toEqual(1);
      expect(createdUser.name).toEqual('Test User');
      expect(createdUser.email).toEqual(userData.email);
      expect(createdUser.password).toEqual('hashedPassword');
      expect(createdUser.avatar).toEqual(userData.avatar);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'Test User 1',
          email: 'email@email.com',
          password: 'hashedPassword',
          avatar: {
            name: 'avatar.png',
            size: 1234,
            location: 'https://example.com/avatar.png',
            key: 'avatar.png',
          },
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test User 2',
          email: 'email@email.com',
          password: 'hashedPassword',
          avatar: {
            name: 'avatar.png',
            size: 1234,
            location: 'https://example.com/avatar.png',
            key: 'avatar.png',
          },
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue(users as any);

      const result = await controller.findAll();

      expect(result).toEqual(users);
      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].id).toEqual(1);
      expect(result[1].id).toEqual(2);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'email@email.com',
        password: 'hashedPassword',
        avatar: {
          name: 'avatar.png',
          size: 1234,
          location: 'https://example.com/avatar.png',
          key: 'avatar.png',
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(user as any);

      const result = await controller.findOne(1);

      expect(result).toEqual(user);
      expect(userService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userData = {
        id: 1,
        name: 'Test User',
        email: 'email@email.com',
        password: 'hashedPassword',
        avatar: {
          name: 'avatar.png',
          size: 1234,
          location: 'https://example.com/avatar.png',
          key: 'avatar.png',
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedUser = {
        id: 1,
        name: 'Test User Updated',
        email: 'email@email.com',
        password: 'hashedPassword',
        avatar: 'https://example.com/avatar.png',
        active: false,
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser as any);

      const result = await controller.update(1, updatedUser);

      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(1, updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = {
        id: 1,
        name: 'Test User',
        email: 'email@email.com',
        password: 'hashedPassword',
        avatar: {
          name: 'avatar.png',
          size: 1234,
          location: 'https://example.com/avatar.png',
          key: 'avatar.png',
        },
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'remove').mockResolvedValue(user as any);

      const result = await controller.remove(1);

      expect(result).toEqual(user);
      expect(userService.remove).toHaveBeenCalledWith(user.id);
    });
  });
});
