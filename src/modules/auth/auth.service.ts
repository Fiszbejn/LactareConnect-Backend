import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Nutriz } from '../nutriz/entities/nutriz.entity';
import { Administrador } from '../administrador/entities/administrador.entity';
import { LoginDto } from './dto/login.dto';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, senha, tipo } = loginDto;

    if (tipo === 'nutriz') {
      const nutriz = await this.dataSource
        .getRepository(Nutriz)
        .findOneBy({ email });
      return this.gerarToken(
        nutriz?.id,
        nutriz?.senhaHash,
        senha,
        'nutriz',
        email,
        nutriz?.nome,
      );
    }

    const administrador = await this.dataSource
      .getRepository(Administrador)
      .findOneBy({ email });
    return this.gerarToken(
      administrador?.id,
      administrador?.senhaHash,
      senha,
      'administrador',
      email,
      administrador?.nome,
    );
  }

  private async gerarToken(
    id: number | undefined,
    senhaHash: string | undefined,
    senha: string,
    tipo: AuthUser['tipo'],
    email: string,
    nome: string | undefined,
  ) {
    if (!id || !senhaHash || !(await bcrypt.compare(senha, senhaHash))) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payload: AuthUser = { id, tipo, email };
    return {
      accessToken: this.jwtService.sign(payload),
      tipo,
      id,
      nome,
    };
  }
}
