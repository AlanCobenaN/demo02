// # Configuración general de la barbería — edita aquí nombre, teléfono, datos de contacto.
export const BUSINESS = {
  name: 'NAVAL',
  tagline: 'Barbería del puerto — estilo costeño',
  whatsapp: '593991234567', // número con código de país, sin '+' ni espacios ni guiones
  phone: '+593 99 123 4567',
  email: 'hola@navalbarber.com',
  address: 'Av. Flavio Reyes y Calle 15, Manta, Ecuador',
  mapsQuery: 'Av Flavio Reyes y Calle 15 Manta',
  instagram: 'naval.barberia',
  facebook: 'naval.barberia',
  url: 'https://naval-manta.vercel.app/',
  rating: '4.8',
  reviewsCount: '680',
  since: 2014,
}

export const images = {
  barberCut: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop',
  barberTools: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=900&auto=format&fit=crop',
  fade: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=900&auto=format&fit=crop',
  razor: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=900&auto=format&fit=crop',
  barberShop: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=900&auto=format&fit=crop',
  pole: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=900&auto=format&fit=crop',
  beard: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=900&auto=format&fit=crop',
  manPortrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop',
  grooming: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=900&auto=format&fit=crop',
  salon: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=900&auto=format&fit=crop',
}

export const heroImage = images.barberCut

// # Servicios de la barbería
// Cada categoría: id, label, icon y services.
// Cada service: name, description, includes[], price, extras[{label, price}], tag (opcional), photo.
export const menu = [
  {
    id: 'cortes',
    label: 'Cortes',
    items: [
      {
        name: 'Corte Clásico',
        description: 'El clásico costeño: máquina, tijera y definición de patillas al detalle.',
        includes: ['Máquina y tijera', 'Definición de patillas', 'Lavado y peinado'],
        price: 8,
        extras: [{ label: 'Perfilado de cejas', price: 2 }],
        photo: images.barberCut,
      },
      {
        name: 'Fade + Diseño',
        description: 'Degradado limpio con línea a mano, sellado con máquina cero.',
        includes: ['Degradado', 'Diseño de línea', 'Pomada y acabado'],
        price: 10,
        extras: [{ label: 'Cejas', price: 2 }],
        tag: 'Más solicitado',
        photo: images.fade,
      },
      {
        name: 'Corte Infantil',
        description: 'Para los más pequeños: paciencia, máquina y un caramelo al final.',
        includes: ['Corte a su medida', 'Algodón y talco'],
        price: 6,
        photo: images.grooming,
      },
      {
        name: 'Degradado Naval',
        description: 'Nuestro sello de la casa: fade alto, textura y acabado tipo naval.',
        includes: ['Fade alto', 'Texturizado', 'Toalla caliente'],
        price: 12,
        extras: [{ label: 'Barba +', price: 5 }],
        tag: 'Estrella',
        photo: images.razor,
      },
      {
        name: 'Corte + Lavado de Cabeza',
        description: 'Corte completo con lavado en tina, masaje capilar y café después.',
        includes: ['Corte + tina', 'Masaje capilar', 'Café de la casa'],
        price: 9,
        photo: images.barberShop,
      },
    ],
  },
  {
    id: 'barba',
    label: 'Barba',
    items: [
      {
        name: 'Afeitado Clásico',
        description: 'Toalla caliente, navaja de la casa y bálsamo de cierre. Origen: la tradición.',
        includes: ['Toalla caliente', 'Navaja', 'Bálsamo'],
        price: 8,
        extras: [{ label: 'Mascarilla facial', price: 3 }],
        tag: 'Tradición',
        photo: images.beard,
      },
      {
        name: 'Perfilado de Barba',
        description: 'Diseño, recorte y aceite de barba para dejarla firme y afilada.',
        includes: ['Recorte', 'Diseño de contorno', 'Aceite de barba'],
        price: 6,
        extras: [{ label: 'Cera fijadora', price: 1.5 }],
        photo: images.manPortrait,
      },
      {
        name: 'Arreglo + Cera',
        description: 'Ajuste de barba con trazo de cera para mantenerla en línea toda la semana.',
        includes: ['Ajuste de barba', 'Cera de diseño'],
        price: 7,
        photo: images.pole,
      },
    ],
  },
  {
    id: 'combos',
    label: 'Combos',
    items: [
      {
        name: 'Combo Corte + Barba',
        description: 'El plan completo del puerto: corte de la casa más perfilado de barba.',
        includes: ['Corte', 'Perfilado de barba', 'Pomada y café'],
        price: 14,
        extras: [{ label: 'Cejas incluidas', price: 0 }],
        tag: 'Popular',
        photo: images.barberCut,
      },
      {
        name: 'Full Naval',
        description: 'Corte, barba con navaja, lavado y manicura rápida. El tratamiento completo.',
        includes: ['Corte + barba', 'Lavado en tina', 'Manicura rápida'],
        price: 18,
        extras: [{ label: 'Mascarilla', price: 3 }],
        tag: 'Favorito',
        photo: images.barberShop,
      },
      {
        name: 'Dúo entre Pibes',
        description: 'Dos cortes clásicos para ir en familia: papá e hijo, o dos amigos.',
        includes: ['2 cortes clásicos', '2 cafés de la casa'],
        price: 12,
        tag: 'Para compartir',
        photo: images.grooming,
      },
    ],
  },
  {
    id: 'cuidado',
    label: 'Cuidado',
    items: [
      {
        name: 'Manicura Masculina',
        description: 'Corte de cutícula, limado y crema de manos. Simple y necesario.',
        includes: ['Limado', 'Cutícula', 'Hidratación'],
        price: 6,
        photo: images.barberTools,
      },
      {
        name: 'Limpieza Facial',
        description: 'Vapor, extracción suave y mascarilla. Carita de descanso garantizada.',
        includes: ['Vapor', 'Extracción', 'Mascarilla'],
        price: 8,
        extras: [{ label: 'Más puntos negros', price: 2 }],
        photo: images.salon,
      },
      {
        name: 'Cera de Cejas',
        description: 'Diseño de ceja con yaquila para darle marco al rostro.',
        includes: ['Diseño', 'Cera de yaquila'],
        price: 4,
        photo: images.pole,
      },
    ],
  },
  {
    id: 'productos',
    label: 'Productos',
    items: [
      {
        name: 'Pomada Costeña',
        description: 'Fijación media, brillo natural y olor a Mar y coco. 100 g.',
        includes: ['Fijación media', 'Brillo natural'],
        price: 9,
        photo: images.barberTools,
      },
      {
        name: 'Aceite de Barba Naval',
        description: 'Mezcla de aceites naturales y aroma de cedro. 30 ml.',
        includes: ['Argan y jojoba', 'Aroma de cedro'],
        price: 10,
        photo: images.beard,
      },
      {
        name: 'Tónico Refrescante',
        description: 'Menta, eucalipto y ruda de monte para después del corte.',
        includes: ['Menta y eucalipto', 'Sin alcohol'],
        price: 7,
        photo: images.manPortrait,
      },
    ],
  },
]

// # Servicios disponibles para agendar por WhatsApp
export const serviceOptions = [
  { name: 'Corte Clásico', duration: '40 min' },
  { name: 'Fade + Diseño', duration: '50 min' },
  { name: 'Degradado Naval', duration: '60 min' },
  { name: 'Afeitado Clásico', duration: '35 min' },
  { name: 'Perfilado de Barba', duration: '25 min' },
  { name: 'Combo Corte + Barba', duration: '70 min' },
  { name: 'Full Naval', duration: '90 min' },
]

// # Horarios y reseñas
export const hours = [
  { day: 'Lunes a Sábado', time: '09:00 – 20:00' },
  { day: 'Domingo', time: '09:00 – 13:00' },
]

export const reviews = [
  {
    text: 'Llegué sin hora y en quince minutos me tenían en la silla. Corte impecable y el café de la casa para esperar. El mejor fade de Manta.',
    name: 'Jorge A.',
    role: 'Reseña de Google',
  },
  {
    text: 'Agendé por WhatsApp el combo corte + barba y llegué directo a la silla. La navaja con toalla caliente es de otro nivel.',
    name: 'Andrés M.',
    role: 'Cliente fijo',
  },
  {
    text: 'Ambiente tranquilo, buen rock suave y precio justo. Volví sabiendo que me iban a atender bien. Es la barbería del puerto.',
    name: 'José W.',
    role: 'Reseña de Facebook',
  },
]