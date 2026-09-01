import { query } from './config/db.js';

export const seedDestinations = async () => {
  const countRes = await query.get('SELECT COUNT(*) as count FROM destinations');
  if (countRes && countRes.count > 0) {
    return;
  }

  const destinationsData = [
    {
      name: 'Netarhat',
      state: 'Jharkhand',
      category: 'Nature',
      description: 'The queen of Chotanagpur, known for serene sunsets, pine forests, and magnificent Magnus Point views.',
      budget: 3000,
      rating: 4.6,
      latitude: 23.474,
      longitude: 84.267,
      best_time: 'October to March',
      eco_score: 90,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Bodh Gaya',
      state: 'Bihar',
      category: 'Religious',
      description: 'A peaceful Buddhist pilgrimage destination housing the sacred Mahabodhi Temple complex and tranquil meditation gardens.',
      budget: 4500,
      rating: 4.8,
      latitude: 24.696,
      longitude: 84.991,
      best_time: 'November to February',
      eco_score: 85,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Darjeeling',
      state: 'West Bengal',
      category: 'Nature',
      description: 'Emerald green tea gardens, panoramic Himalayan views, Kanchenjunga sunrises, and heritage toy train charm.',
      budget: 8000,
      rating: 4.7,
      latitude: 27.041,
      longitude: 88.266,
      best_time: 'March to May, Oct to Dec',
      eco_score: 88,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Puri',
      state: 'Odisha',
      category: 'Cultural',
      description: 'Historic Jagannath temple traditions, sacred coastal vibe, sand art, and golden Bay of Bengal beaches.',
      budget: 5000,
      rating: 4.5,
      latitude: 19.813,
      longitude: 85.831,
      best_time: 'October to March',
      eco_score: 78,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Udaipur',
      state: 'Rajasthan',
      category: 'Historical',
      description: 'The City of Lakes with glittering marble palaces, Lake Pichola boat rides, vibrant bazaars, and royal artistry.',
      budget: 9000,
      rating: 4.9,
      latitude: 24.586,
      longitude: 73.713,
      best_time: 'September to March',
      eco_score: 82,
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Munnar',
      state: 'Kerala',
      category: 'Eco Tourism',
      description: 'Rolling tea estates, misty mountain trails, wildlife sanctuaries, and aromatic spice plantation walks in God’s Own Country.',
      budget: 8500,
      rating: 4.8,
      latitude: 10.088,
      longitude: 77.059,
      best_time: 'September to March',
      eco_score: 95,
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Hampi',
      state: 'Karnataka',
      category: 'Historical',
      description: 'UNESCO World Heritage Vijayanagara empire ruins framed by surreal boulder-strewn landscapes along the Tungabhadra River.',
      budget: 6500,
      rating: 4.7,
      latitude: 15.335,
      longitude: 76.46,
      best_time: 'October to February',
      eco_score: 86,
      image: 'https://images.unsplash.com/photo-1600100397608-f010f44414b3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'Tirthan Valley',
      state: 'Himachal Pradesh',
      category: 'Hidden Gem',
      description: 'A quiet riverside alpine gateway to the Great Himalayan National Park with trout streams, wooden villages, and pine forests.',
      budget: 7000,
      rating: 4.8,
      latitude: 31.66,
      longitude: 77.35,
      best_time: 'March to June, Oct to Nov',
      eco_score: 94,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  for (const d of destinationsData) {
    await query.run(
      `INSERT INTO destinations (name, state, category, description, image, budget, rating, latitude, longitude, best_time, eco_score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [d.name, d.state, d.category, d.description, d.image, d.budget, d.rating, d.latitude, d.longitude, d.best_time, d.eco_score]
    );
  }

  console.log('✅ Seeded destinations successfully.');
};
