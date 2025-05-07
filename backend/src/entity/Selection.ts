import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Application } from "./Application";
  
  @Entity()
  export class Selection {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    rank: number;
  
    @Column()
    comment: string;
  
    @ManyToOne(() => Application, (application) => application.selections, {
      eager: true,
      cascade: true,
    })
    application: Application;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  