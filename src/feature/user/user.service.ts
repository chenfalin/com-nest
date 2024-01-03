import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    // async onModuleInit() {
    //     if (await this.findOneByAccount('admin')) return;
    //     // 初始化系统管理员
    //     const admin = this.userRepository.create({
    //         account: 'admin',
    //         password: this.cryptoUtil.encryptPassword("admin"),
    //         username: "系统管理员",
    //         role: "admin"
    //     });
    //     await this.userRepository.save(admin);
    // }
    // 注入 一个操作数据表，一个加密密码
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cryptoUtil: CryptoUtil,
    ) { }

    /**
     * 通过登录账号查询用户
     *
     * @param account 登录账号
     */
    async findOneByAccount(account: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                account
            }
        });
        return user
    }
    async findOne(account: string): Promise<User | undefined> {
        console.log("user service ts findone enter", account);
        const user = await this.userRepository.findOne({
            where: {
                account
            }
        });

        console.log("user service ts findone leave", user);
        return user;
    }
}
