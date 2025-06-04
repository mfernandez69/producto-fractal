export interface Usuario {
  createdAt: Date;
  cursoRef: string;
  email: string;
  puntuacion: number;
  role: 'student' | 'teacher' | 'admin';
  deAlta: boolean;
}

export const usuarios: Usuario[] = [
  {
    createdAt: new Date('2025-05-12T15:14:53+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'user1@student.com',
    puntuacion: 5,
    role: 'student',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-11T10:30:00+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'user2@student.com',
    puntuacion: 3,
    role: 'student',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-13T08:45:12+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'user3@student.com',
    puntuacion: 4,
    role: 'student',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-10T22:00:00+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'user4@student.com',
    puntuacion: 2,
    role: 'student',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-14T12:15:30+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'user5@student.com',
    puntuacion: 5,
    role: 'student',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-15T09:30:00+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'teacher1@teacher.com',
    puntuacion: 5,
    role: 'teacher',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-15T10:45:00+02:00'),
    cursoRef: '/Curso/20zhB5cQzC7fV2cTspJ2',
    email: 'teacher2@teacher.com',
    puntuacion: 5,
    role: 'teacher',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-16T11:20:00+02:00'),
    cursoRef: '/Curso/3xRtP9qYzL8mN7bHjK4F',
    email: 'teacher3@teacher.com',
    puntuacion: 4,
    role: 'teacher',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-10T08:00:00+02:00'),
    cursoRef: '',
    email: 'admin1@admin.com',
    puntuacion: 5,
    role: 'admin',
    deAlta: true,
  },
  {
    createdAt: new Date('2025-05-12T14:30:00+02:00'),
    cursoRef: '',
    email: 'admin2@admin.com',
    puntuacion: 5,
    role: 'admin',
    deAlta: true,
  }
];
