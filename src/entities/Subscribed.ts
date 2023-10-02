
// src/entities/SpotifyTrack.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subscribed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'user_id' property
  userId: string;

  @Column({ name: 'track_json', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'track_json' property
  trackJson: string;
  
  @Column({ name: 'email', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'email' property
  email: string;

  @Column({ name: 'display_name', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'display_name' property
  display_name: string;
  
  @Column({ name: 'api_key', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'display_name' property
  api_key: string;

 
}
