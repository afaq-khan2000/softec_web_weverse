const Item = require('../models/Item');

const seedItem = async () => {
  try {
    await Item.deleteMany();

    const admin = await Item.create([
      {
        title: 'The Legend of Zelda: Breath of the Wild',
        description:
          'An action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles.',
        image:
          ' https://www.stuff.tv/wp-content/uploads/sites/2/2022/02/ER-head.jpg',
        marketPrice: 59.99,
        costPrice: 30.0,
        type: 'VideoGame',
        stock: 50,
        minAge: 0,
        isDeleted: false,
        category: 'action',
      },
      {
        title: 'Super Mario Odyssey',
        description:
          'A 3D platform game developed and published by Nintendo for the Nintendo Switch.',
        image:
          'https://www.stuff.tv/wp-content/uploads/sites/2/2022/03/Wallpaper_Zagreus01.jpg?resize=2048,1151',
        marketPrice: 59.99,
        costPrice: 25.0,
        type: 'VideoGame',
        stock: 30,
        minAge: 0,
        isDeleted: false,
        category: 'action',
      },
      {
        title: 'Red Dead Redemption 2',
        description:
          'A Western action-adventure game developed and published by Rockstar Games for the PlayStation 4, Xbox One, and PC.',
        image:
          'https://www.stuff.tv/wp-content/uploads/sites/2/2021/07/8._deathloop_julianna_1.jpg',
        marketPrice: 59.99,
        costPrice: 35.0,
        type: 'VideoGame',
        stock: 20,
        minAge: 18,
        isDeleted: false,
        category: 'adventure',
      },
      {
        title: 'The Last of Us Part II',
        description:
          'An action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment for the PlayStation 4.',
        image:
          'https://www.stuff.tv/wp-content/uploads/sites/2/2021/12/halo-infinite6.png',
        marketPrice: 59.99,
        costPrice: 40.0,
        type: 'VideoGame',
        stock: 10,
        minAge: 18,
        isDeleted: false,
        category: 'adventure',
      },

      {
        title: 'Logitech G Pro X Headset',
        description:
          'Professional gaming headset with Blue VO!CE mic technology and premium audio drivers',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--2ypCKx1F--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/9c7425273bce43d9/top.jpg',
        marketPrice: 129.99,
        costPrice: 89.99,
        type: 'GamingGear',
        stock: 50,
        minAge: 0,
        isDeleted: false,
        category: 'strategy',
      },
      {
        title: 'Razer DeathAdder V2 Gaming Mouse',
        description:
          'Ultra-fast and accurate gaming mouse with customizable Chroma RGB lighting',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--YmUFGlOQ--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/0fff3e113d024bc8/reviewed-best-monitor.jpg',
        marketPrice: 69.99,
        costPrice: 49.99,
        type: 'GamingGear',
        stock: 30,
        minAge: 0,
        isDeleted: false,
        category: 'strategy',
      },
      {
        title: 'HyperX Cloud II Gaming Headset',
        description:
          'Comfortable and durable gaming headset with 7.1 surround sound',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--YMwaGeg7--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/982024280342463b/sn30pro.jpg',
        marketPrice: 99.99,
        costPrice: 79.99,
        type: 'GamingGear',
        stock: 20,
        minAge: 0,
        isDeleted: false,
        category: 'Gamming mouse',
      },
      {
        title: 'Logitech G502 HERO High Performance Gaming Mouse',
        description:
          'Advanced gaming mouse with HERO 25K sensor and customizable weights',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--uiiuLstZ--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/07744042a7574e92/Audeze-Penrose-X-hero.jpg',
        marketPrice: 79.99,
        costPrice: 59.99,
        type: 'GamingGear',
        stock: 25,
        minAge: 0,
        isDeleted: false,
        category: 'Gamming mouse',
      },
      {
        title: 'SteelSeries Apex Pro TKL Mechanical Gaming Keyboard',
        description:
          'High-performance gaming keyboard with customizable OLED display and adjustable actuation',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--yQ5L0Dj8--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/91e4cd8d2a8d43e9/SteelSeries_Apex_Pro.jpg',
        marketPrice: 179.99,
        costPrice: 139.99,
        type: 'GamingGear',
        stock: 10,
        minAge: 0,
        isDeleted: false,
        category: 'gaming headset',
      },
      {
        title: 'ASUS ROG Strix Scope RGB Mechanical Gaming Keyboard',
        description:
          'Compact and durable gaming keyboard with Cherry MX RGB switches and customizable lighting',
        image:
          'https://reviewed-com-res.cloudinary.com/image/fetch/s--54TIjDax--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/attachment/5843aebb90a24829/Corsair_Dark_Core_RGB_Pro.jpg',
        marketPrice: 149.99,
        costPrice: 119.99,
        type: 'GamingGear',
        stock: 15,
        minAge: 0,
        isDeleted: false,
        category: 'gaming headset',
      },
      {
        title: 'Super Mario Odyssey',
        description:
          'A 3D platform game developed and published by Nintendo for the Nintendo Switch.',
        image:
          'https://www.stuff.tv/wp-content/uploads/sites/2/2022/02/Stuff-Horizon-Forbidden-West-1.png',
        marketPrice: 59.99,
        costPrice: 25,
        type: 'VideoGame',
        stock: 30,
        minAge: 0,
        isDeleted: false,
        category: 'sports',
      },
      {
        title: 'The Last of Us Part II',
        description:
          'An action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment for the PlayStation 4.',
        image:
          'https://www.stuff.tv/wp-content/uploads/sites/2/2021/06/rc_riftapart_who_ps5-scaled_1.jpg',
        marketPrice: 59.99,
        costPrice: 40,
        type: 'VideoGame',
        stock: 10,
        minAge: 18,
        isDeleted: false,
        category: 'sports',
      },
      {
        title: 'The Legend of Zelda: Breath of the Wild',
        description:
          'An action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles.',
        image:
          'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
        marketPrice: 59.99,
        costPrice: 30,
        type: 'VideoGame',
        stock: 50,
        minAge: 0,
        isDeleted: false,
        category: 'multiplayer',
      },
      {
        title: 'Red Dead Redemption 2',
        description:
          'A Western action-adventure game developed and published by Rockstar Games for the PlayStation 4, Xbox One, and PC.',
        image:
          'https://play-lh.googleusercontent.com/bVJdXNp1sOW-ZvsEmaabQO3-2VeXNYEjLUtm8Gc8er7ZUM-J8w_snvWQv30AFAgrNUk',
        marketPrice: 59.99,
        costPrice: 35,
        type: 'VideoGame',
        stock: 20,
        minAge: 18,
        isDeleted: false,
        category: 'multiplayer',
      },
    ]);

    console.log('Item created successfully!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedItem;
