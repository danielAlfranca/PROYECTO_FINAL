
<?php 

$nombres_empresas =  
    
    explode(",","Boho Explore,Branded Tour,
    Companion Trip,Conquest Tour,
    Eden Tour,
    Garnet Travel,
    Gaze Explore,
    Microfilm Travel,
    Mystic Tour,
    Nomad Tour,
    Pin Travel,
    Production Travel,
    Retreat Tour,
    Richness Travel,
    Road Travel,
    Sapphire Tour,
    Selfie Travel,
    Takeoff Travel,
    Touriva,
    Tourlytical,
    Touronus,
    Tourvio,
    Travelella,
    Travelnest,
    Trivia Explore,
    Ward Explore");

$nombres_hoteles = explode(",",strtolower(("AEGIS,AGILE,AKIN,AMETHYST,AMMO,ATLANTIS,BISMUTH,CELESTIAL,DELICACY,EMERALD,EXCEPTION,LAVISH,MAGENTA,MAJESTIC,OBSIDIAN,OSIRIS,PEGASUS,PHARAOH")));


$direcciones = explode("//","Colegio Armando 4 Puerta 301, Esc. 614, 89283, Madrid//
Puerta Norma Cruz 14, Esc. 966, 05162, Zamora//
Lado Gabriela 39, Puerta 463, 61681, Valladolid//
Mercado Alfonso 4 Puerta 715, Esc. 476, 77119, Logroño//
Colegio Gilberto Valdivia, 5, Esc. 826, 08830, Badajoz//
Parcela Adela s/n., Esc. 433, 65065, Vigo//
Solar Tomás Montes, 7 Puerta 280, Esc. 000, 94592, Coslada//
Sección Carmen Amador s/n., Esc. 521, 12790, Arrecife//
Municipio María Cristina Vázquez s/n. Esc. 039, Esc. 573, 54640, Cerdañola//
Escalinata José María 7, Esc. 913, 29319, Mollet del Vallés//
Ferrocarril Gonzalo 67, Puerta 979, 85776, Chiclana de la Frontera//
Partida Alfonso Limón 5, Puerta 821, 83907, Sevilla//
Polígono María Soledad Jaime 2, Esc. 745, 49882, Rubí, Cantabria, Spain//
Torrente Julio 9 Esc. 363, Esc. 365, 99083, Alicante//
Partida Margarita Tamez 4, Puerta 073, 85944, Bilbao//
Paseo Marcela Olvera, 39, Esc. 812, 07922, Lugo//
Parque Rubén Barraza s/n. Esc. 607, Puerta 571, 22293, Talavera de la Reina//
Poblado Antonia s/n. Esc. 784, Esc. 333, 28252, Irún, Aragón, Spain//
Manzana Sergio 23, Puerta 258, 63828, Bilbao//
Apartamento Cristóbal Casas 7 Puerta 628, Esc. 525, 62469, Alcalá de Henares//
Apartamento Rosalia Pantoja 17 Puerta 287, Esc. 852, 84630, Pontevedra//
Plaza Rosalia Romo, 6 Puerta 870, Puerta 718, 06421, Sevilla//
Rampa Florencia, 53 Esc. 842, Puerta 198, 66812, Molina de Segura//
Barrio Sara, 7, Esc. 038, 63537, Toledo//
Vía Pública Cristián Almanza 7 Esc. 435, Esc. 427, 38233, San Fernando//
Sector Diego, 5 Puerta 270, Esc. 222, 15674, Alicante//
Bajada Fernando 74 Puerta 101, Puerta 715, 03847, Valencia//
Lado Mariana Alva 66 Esc. 628, Puerta 625, 43017, Badajoz//
Bajada Rosa Gil, 25, Esc. 432, 02706, Elche//
Torrente Cristina Cantú 3, Esc. 340, 82022, Cornellá de Llobregat//
Paseo Estela Mota 2, Esc. 601, 63824, Lugo//
Extramuros Octavio, 6, Esc. 010, 08988, El Ejido//
Rincón Marilú 1 Esc. 961, Puerta 739, 25781, Barcelona//
Riera Ricardo Chapa 99, Puerta 814, 93302, Cornellá de Llobregat//
Prolongación Marta Salgado 93 Esc. 871, Esc. 840, 70692, Torrejón de Ardoz//
Paseo José María Reyes s/n., Esc. 769, 27049, Ceuta//
Salida José Brito, 3 Puerta 682, Puerta 120, 92462, Ceuta//
Barranco Patricio Nava, 55, Puerta 227, 04300, Almería//
Edificio Blanca Valenzuela s/n., Esc. 324, 48192, Molina de Seguran//
Prolongación Yolanda 13 Esc. 522, Puerta 125, 50061, Jaén//
Lado María José 80 Esc. 199, Esc. 535, 26742, Valencia//
Plaza Barbara Escobedo 53 Puerta 337, Esc. 923, 92908, Orense//
Salida Pedro, 47 Puerta 666, Puerta 047, 26074, Vigo//
Manzana Adán Gómez 51, Puerta 489, 09553, Baracaldo//
Poblado Ignacio, 1 Esc. 846, Esc. 987, 95566, Mataró//
Pasaje Dorotea, 71 Esc. 811, Puerta 723, 88461, Guadalajara//
Colegio Marisol Segovia, 6 Esc. 184, Esc. 833, 37068, Alcoy//
Ronda Julio Rascón s/n., Esc. 924, 83664, Arrecife//
Torrente Felipe s/n., Esc. 866, 68075, Mijas//
Aldea Josefina s/n., Esc. 025, 10739, Paterna//
Glorieta Fernando 5, Esc. 616, 78593, Fuenlabrada//
Parcela María del Carmen Quiñónez, 96, Puerta 647, 44364, Molina de Segura//
Ronda Francisco, 91 Puerta 219, Esc. 951, 84115, Almería//
Muelle Ramona Córdova, 35, Puerta 238, 43649, Ferrol//
Poblado Jerónimo, 4, Puerta 494, 41127, Sagunto//");


$nombres_tours = [

    "catarata de ahuashiyacu",
    "Laguna azul",
    "cañones del colpa",
    "catarata de huacamaillo",
    "Alto mayo",
    "Chazuta",
    "tarapoto city tour",
    "rio abiseo",
    "catarata de pucayaquillo",
    "catarata de carpishuyacu",
    "lamas",
    "pesca en rio Huallaga",
    "rappel en talliquiui",
    "kuelab",
    "Sarcófagos  de karajia",
    "chachapoyas city tour",
    "Gocta",
    "Cuevas de palestina",
    "Laguna de los Cóndores",
    "Catarata de Yumbilla",
    "cordillera Azul"
];

$nombres_destinos = [

    "Chachapoyas",
    "Tarapoto",
    "sauce",
    "Cuzco",
    "Cancun",
    "juanjui",
    "iquitos"
   
];

?>
