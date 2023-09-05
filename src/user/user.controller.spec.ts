import { Test, TestingModule } from '@nestjs/testing';
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
      const userData = {
        name: 'Test User',
        email: 'email@email.com',
        password: 'password123',
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

      const createdUser = {
        id: 1,
        ...userData,
        password: 'hashedPassword',
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser as any);

      const result = await controller.create(userData);

      expect(result).toEqual(createdUser);
      expect(userService.create).toHaveBeenCalledWith(userData);
      expect(result.password).not.toEqual(userData.password);
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

      expect(result.id).toEqual(1);

      expect(result.name).toEqual('Test User');
      expect(result.email).toEqual(user.email);
      expect(result.password).toEqual(user.password);
      expect(result.avatar).toEqual(user.avatar);
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
        avatar: {
          name: 'avatar.png',
          size: 1234,
          location: 'https://example.com/avatar.png',
          key: 'avatar.png',
        },
        active: false,
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser as any);

      const result = await controller.update(1, updatedUser);

      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(1, updatedUser);
      expect(result.name).toEqual('Test User Updated');
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
      expect(result.id).toEqual(user.id);
    });
  });
});
