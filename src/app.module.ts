import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { ProjectsModule } from './api/projects/projects.module';
import { TasksModule } from './api/tasks/tasks.module';
import { CommentsModule } from './api/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
    ApiModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5444,
      username: 'postgres',
      password: 'postgres',
      database: 'pms',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    RouterModule.register([
      {
        path: 'api/v1',
        module: ApiModule,
        children: [
          {
            path: 'roles',
            module: RolesModule,
          },
          {
            path: 'users',
            module: UsersModule,
          },
          {
            path: 'tasks',
            module: TasksModule,
          },
          {
            path: 'comments',
            module: CommentsModule,
          },
          {
            path: 'projects',
            module: ProjectsModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
