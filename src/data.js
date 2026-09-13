// # Configuración general de la barbería — edita aquí nombre, teléfono, datos de contacto.
export const BUSINESS = {
  name: 'NAVAL',
  tagline: 'Barbería urbana — el puerto a puro filo',
  whatsapp: '593991234567', // número con código de país, sin '+' ni espacios ni guiones
  phone: '+593 99 123 4567',
  email: 'hola@navalbarber.com',
  address: 'Av. Flavio Reyes y Calle 15, Manta, Ecuador',
  mapsQuery: 'Av Flavio Reyes y Calle 15 Manta',
  instagram: 'naval.barberia',
  facebook: 'naval.barberia',
  url: 'https://naval-manta.vercel.app/',
  rating: '4.8',
  reviewsCount: '420',
  since: 2022,
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
  man2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop',
  man3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=900&auto=format&fit=crop',
}

export const heroImage = images.barberCut

// # Servicios y precios — cada categoría: id, label y services.
// Cada service: name, description, price (visible) y duration (duración aproximada).
export const menu = [
  {
    id: 'corte',
    label: 'Corte',
    items: [
      {
        name: 'Corte Clásico',
        description: 'Máquina, tijera y patillas definidas.',
        price: 8,
        duration: '40 min',
      },
      {
        name: 'Fade + Diseño',
        description: 'Degradado limpio con línea a mano.',
        price: 10,
        duration: '50 min',
      },
      {
        name: 'Degradado Naval',
        description: 'Nuestro sello: fade alto, textura y acabado.',
        price: 12,
        duration: '60 min',
      },
      {
        name: 'Corte Infantil',
        description: 'Corte a su medida y paciencia de sobra.',
        price: 6,
        duration: '30 min',
      },
    ],
  },
  {
    id: 'barba',
    label: 'Barba',
    items: [
      {
        name: 'Afeitado Clásico',
        description: 'Toalla caliente, navaja y bálsamo.',
        price: 8,
        duration: '35 min',
      },
      {
        name: 'Perfilado de Barba',
        description: 'Diseño, recorte y aceite de barba.',
        price: 6,
        duration: '25 min',
      },
      {
        name: 'Arreglo + Cera',
        description: 'Ajuste con cera para mantener la línea.',
        price: 7,
        duration: '20 min',
      },
    ],
  },
  {
    id: 'combo',
    label: 'Corte + Barba',
    items: [
      {
        name: 'Combo Corte + Barba',
        description: 'El plan completo: corte más perfilado.',
        price: 14,
        duration: '70 min',
      },
      {
        name: 'Full Naval',
        description: 'Corte, barba con navaja y lavado.',
        price: 18,
        duration: '90 min',
      },
    ],
  },
  {
    id: 'disenos',
    label: 'Diseños',
    items: [
      {
        name: 'Línea / Patrón',
        description: 'Diseño a máquina cero en el fade.',
        price: 5,
        duration: '20 min',
      },
      {
        name: 'Cejas',
        description: 'Diseño de ceja para enmarcar la cara.',
        price: 4,
        duration: '15 min',
      },
    ],
  },
  {
    id: 'otros',
    label: 'Otros servicios',
    items: [
      {
        name: 'Manicura Masculina',
        description: 'Limado, cutícula e hidratación.',
        price: 6,
        duration: '25 min',
      },
      {
        name: 'Limpieza Facial',
        description: 'Vapor, extracción y mascarilla.',
        price: 8,
        duration: '30 min',
      },
      {
        name: 'Lavado + Masaje',
        description: 'Tina, masaje capilar y café de la casa.',
        price: 7,
        duration: '25 min',
      },
    ],
  },
]

// # Servicios disponibles para agendar por WhatsApp (Reservar)
export const serviceOptions = [
  { name: 'Corte Clásico', duration: '40 min', price: 8 },
  { name: 'Fade + Diseño', duration: '50 min', price: 10 },
  { name: 'Degradado Naval', duration: '60 min', price: 12 },
  { name: 'Combo Corte + Barba', duration: '70 min', price: 14 },
  { name: 'Full Naval', duration: '90 min', price: 18 },
]

// # Barberos del equipo
export const barbers = [
  {
    name: 'Lucho “El Capitán”',
    specialty: 'Fade y tijera clásica',
    photo: images.manPortrait,
    tag: '10 años de silla',
  },
  {
    name: 'Carlos “Cobra”',
    specialty: 'Diseños y máquina cero',
    photo: images.man2,
    tag: 'El de los patrones',
  },
  {
    name: 'Andrés “El Griego”',
    specialty: 'Barba con navaja caliente',
    photo: images.man3,
    tag: 'Toalla caliente',
  },
]

// # Galería — foto, categoría (Cortes / Barbas / Diseños)
export const gallery = [
  { photo: images.fade, category: 'Cortes' },
  { photo: images.barberCut, category: 'Cortes' },
  { photo: images.beard, category: 'Barbas' },
  { photo: images.razor, category: 'Barbas' },
  { photo: images.barberShop, category: 'Diseños' },
  { photo: images.grooming, category: 'Diseños' },
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
    text: 'Ambiente fuerte, buen rock y precio justo. Volví sabiendo que me iban a atender bien. Es la barbería del puerto.',
    name: 'José W.',
    role: 'Reseña de Facebook',
  },
]