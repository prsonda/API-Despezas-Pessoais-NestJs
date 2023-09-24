import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(createdUser as any);

      await service.create(req, res);

      expect(service.create).toHaveBeenCalledWith(userData, res);
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

      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
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

      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      const result = await service.findOne(1);

      expect(result).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith(1);

      expect(result.id).toEqual(1);

      expect(result.name).toEqual('Test User');
      expect(result.email).toEqual(user.email);
      expect(result.password).toEqual(user.password);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userData = {
        id: 1,
        name: 'Test User',
        email: 'email@email.com',
        password: 'hashedPassword',
        avatar: 'https://example.com/avatar.png',
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

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

      const result = await service.update(1, updatedUser);

      expect(result).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(1, updatedUser);
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

      jest.spyOn(service, 'remove').mockResolvedValue(user as any);

      const result = await service.remove(1);

      expect(result).toEqual(user);
      expect(service.remove).toHaveBeenCalledWith(user.id);
      expect(result.id).toEqual(user.id);
    });
  });
});
