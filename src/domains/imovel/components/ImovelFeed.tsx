import { Imovel } from '../types/types';
import ImovelCard from './ImovelCard';

const properties: Imovel[] = [
  {
    id: 1,
    title: 'Residência Contemporânea Premium',
    location: 'Barra da Tijuca, Rio de Janeiro',
    price: 'R$ 1.250.000',
    bedrooms: 4,
    bathrooms: 5,
    area: 280,
    rating: 4.8,
    type: 'Casa',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Apartamento Vista Panorâmica',
    location: 'Copacabana, Rio de Janeiro',
    price: 'R$ 850.000',
    bedrooms: 3,
    bathrooms: 3,
    area: 145,
    rating: 4.8,
    type: 'Apartamento',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Cobertura Duplex de Luxo',
    location: 'Ipanema, Rio de Janeiro',
    price: 'R$ 2.100.000',
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    rating: 4.8,
    type: 'Cobertura',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Casa de Arquitetura Única',
    location: 'Santa Teresa, Rio de Janeiro',
    price: 'R$ 680.000',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    rating: 4.8,
    type: 'Casa',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Loft Industrial Premium',
    location: 'Lapa, Rio de Janeiro',
    price: 'R$ 520.000',
    bedrooms: 1,
    bathrooms: 2,
    area: 95,
    rating: 4.8,
    type: 'Loft',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Residência Familiar Moderna',
    location: 'Tijuca, Rio de Janeiro',
    price: 'R$ 950.000',
    bedrooms: 4,
    bathrooms: 4,
    area: 220,
    rating: 4.8,
    type: 'Apartamento',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=250&fit=crop'
  }
];

export default function ImovelFeed() {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {properties.map((imovel) => (
        <ImovelCard key={imovel.id} imovel={imovel} />
      ))}
    </section>
  );
}
