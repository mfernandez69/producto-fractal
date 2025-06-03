import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

/* 
He usado estos comandos para poder usar seed.ts:
npx tsc src/db/seed.ts
node src/db/seed.js
*/

// Firebase configuration from my app.config.ts
const firebaseConfig = {
  projectId: "dbclientefractal",
  appId: "1:246466666690:web:4fdb58cfb49922cc8b9b5b",
  storageBucket: "dbclientefractal.firebasestorage.app",
  apiKey: "AIzaSyAYLXP4Zp1Zw6G17XNbksmWa4RKBH9xymw",
  authDomain: "dbclientefractal.firebaseapp.com",
  messagingSenderId: "246466666690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// User interface
export interface Usuario {
  createdAt: Date;
  cursoRef: string;
  email: string;
  puntuacion: number;
  role: 'student';
}

// Event interface
export interface Evento {
  titulo: string;
  descripcion: string;
  fecha: Date;
  ubicacion: string;
  organizador: string;
  cursoRef: string;
  createdAt: Date;
}

/**
 * Seeds user data into the Firestore database
 */
const seedUsers = async (): Promise<void> => {
  try {
    console.log('Seeding users to database...');
    const usersCollection = collection(db, 'Usuario');
    
    // Import user data from the sample-date file in the same folder
    const { usuarios } = await import('./sample-user-data');
    
    for (const usuario of usuarios) {
      // Convert JavaScript Date to Firestore Timestamp
      const userData = {
        ...usuario,
        createdAt: Timestamp.fromDate(usuario.createdAt)
      };
      
      await addDoc(usersCollection, userData);
      console.log(`Added user: ${usuario.email}`);
    }
    
    console.log('User seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

/**
 * Seeds event data into the Firestore database
 */
const seedEvents = async (): Promise<void> => {
  try {
    console.log('Seeding events to database...');
    const eventsCollection = collection(db, 'Evento');
    
    // Import event data from the sample-event-data file in the same folder
    const { eventos } = await import('./sample-event-data');
    
    for (const evento of eventos) {
      // Convert JavaScript Date to Firestore Timestamp
      const eventData = {
        ...evento,
        fecha: Timestamp.fromDate(evento.fecha),
        createdAt: Timestamp.fromDate(evento.createdAt)
      };
      
      await addDoc(eventsCollection, eventData);
      console.log(`Added event: ${evento.titulo}`);
    }
    
    console.log('Event seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
};

// Main seeding function
export const seedDatabase = async (): Promise<void> => {
  try {
    await seedUsers();
    await seedEvents();
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
};

// Run when script is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;