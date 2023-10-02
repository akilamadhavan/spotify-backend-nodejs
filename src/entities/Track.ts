
// src/entities/SpotifyTrack.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'subscriber_id', type: 'int',  nullable: true }) // Map 'track_name' column to 'user_id' property
  subscriberId: number;

  @Column({ name: 'name', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'track_json' property
  name: string;
  
  @Column({ name: 'path', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'email' property
  path: string;

  @Column({ name: 'artist', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'display_name' property
  artist: string;
  
  @Column({ name: 'type', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'display_name' property
  type: string;
  
  @Column({ name: 'track_id', type: 'varchar',  nullable: true }) // Map 'track_name' column to 'display_name' property
  trackId: string;
 
 
}
