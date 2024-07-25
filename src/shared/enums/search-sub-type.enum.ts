export enum SearchSubType {
  //* Disciple
  DiscipleByPastorNames = 'disciple_by_pastor_names',
  DiscipleByPastorLastNames = 'disciple_by_pastor_last_names',
  DiscipleByPastorFullName = 'disciple_by_pastor_full_name',
  DiscipleByCopastorNames = 'disciple_by_copastor_names',
  DiscipleByCopastorLastNames = 'disciple_by_copastor_last_names',
  DiscipleByCopastorFullName = 'disciple_by_copastor_full_name',
  DiscipleBySupervisorNames = 'disciple_by_supervisor_names',
  DiscipleBySupervisorLastNames = 'disciple_by_supervisor_last_names',
  DiscipleBySupervisorFullName = 'disciple_by_supervisor_full_name',
  DiscipleByPreacherNames = 'disciple_by_preacher_names',
  DiscipleByPreacherLastNames = 'disciple_by_preacher_last_names',
  DiscipleByPreacherFullName = 'disciple_by_preacher_full_name',
  ByDiscipleNames = 'by_disciple_names',
  ByDiscipleLastNames = 'by_disciple_last_names',
  ByDiscipleFullName = 'by_disciple_full_name',

  //* Copastor
  CopastorByPastorNames = 'copastor_by_pastor_names',
  CopastorByPastorLastNames = 'copastor_by_pastor_last_names',
  CopastorByPastorFullName = 'copastor_by_pastor_full_name',
  ByCopastorNames = 'by_copastor_names',
  ByCopastorLastNames = 'by_copastor_last_names',
  ByCopastorFullName = 'by_copastor_full_name',

  //* Supervisor
  SupervisorByPastorNames = 'supervisor_by_pastor_names',
  SupervisorByPastorLastNames = 'supervisor_by_pastor_last_names',
  SupervisorByPastorFullName = 'supervisor_by_pastor_full_name',
  SupervisorByCopastorNames = 'supervisor_by_copastor_names',
  SupervisorByCopastorLastNames = 'supervisor_by_copastor_last_names',
  SupervisorByCopastorFullName = 'supervisor_by_copastor_full_name',
  BySupervisorNames = 'by_supervisor_names',
  BySupervisorLastNames = 'by_supervisor_last_names',
  BySupervisorFullName = 'by_supervisor_full_name',

  //* Preacher
  PreacherByPastorNames = 'preacher_by_pastor_names',
  PreacherByPastorLastNames = 'preacher_by_pastor_last_names',
  PreacherByPastorFullName = 'preacher_by_pastor_full_name',
  PreacherByCopastorNames = 'preacher_by_copastor_names',
  PreacherByCopastorLastNames = 'preacher_by_copastor_last_names',
  PreacherByCopastorFullName = 'preacher_by_copastor_full_name',
  PreacherBySupervisorNames = 'preacher_by_supervisor_names',
  PreacherBySupervisorLastNames = 'preacher_by_supervisor_last_names',
  PreacherBySupervisorFullName = 'preacher_by_supervisor_full_name',
  ByPreacherNames = 'by_preacher_names',
  ByPreacherLastNames = 'by_preacher_last_names',
  ByPreacherFullName = 'by_preacher_full_name',

  //* Leaders
  LeaderByPastorNames = 'leader_by_pastor_names',
  LeaderByPastorLastNames = 'leader_by_pastor_last_names',
  LeaderByPastorFullName = 'leader_by_pastor_full_name',
  LeaderByCopastorNames = 'leader_by_copastor_names',
  LeaderByCopastorLastNames = 'leader_by_copastor_last_names',
  LeaderByCopastorFullName = 'leader_by_copastor_full_name',
  LeaderBySupervisorNames = 'leader_by_supervisor_names',
  LeaderBySupervisorLastNames = 'leader_by_supervisor_last_names',
  LeaderBySupervisorFullName = 'leader_by_supervisor_full_name',
  ByLeaderNames = 'by_leader_names',
  ByLeaderLastNames = 'by_leader_last_names',
  ByLeaderFullName = 'by_leader_full_name',


  //* Module Family Home
  FamilyHouseByPastorNames = 'family_house_by_pastor_names',
  FamilyHouseByPastorLastNames = 'family_house_by_pastor_last_names',
  FamilyHouseByPastorFullName = 'family_house_by_pastor_full_name',
  FamilyHouseByCopastorNames = 'family_house_by_copastor_names',
  FamilyHouseByCopastorLastaNames = 'family_house_by_copastor_last_names',
  FamilyHouseByCopastorFullName = 'family_house_by_copastor_full_name',
  FamilyHouseBySupervisorNames = 'family_house_by_supervisor_names',
  FamilyHouseBySupervisorLastNames = 'family_house_by_supervisor_last_names',
  FamilyHouseBySupervisorFullName = 'family_house_by_supervisor_full_name',
  FamilyHouseByPreacherNames = 'family_house_by_preacher_names',
  FamilyHouseByPreacherLastNames = 'family_house_by_preacher_last_names',
  FamilyHouseByPreacherFullName = 'family_house_by_preacher_full_name',

  //* Tithe
  TitheByNames = 'tithe_by_names',
  TitheByLastNames = 'tithe_by_last_names',
  TitheByFullName = 'tithe_by_full_name',
  TitheByDate = 'tithe_by_date',
  TitheByDateNames = 'tithe_by_date_names',
  TitheByDateLastNames = 'tithe_by_date_last_names',
  TitheByDateFullName = 'tithe_by_date_full_name',

  // ! Offering Income
  //* Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  OfferingByDate = 'offering_by_date',

  //* Sunday Worship, youngs, school sunday
  OfferingByShift = 'offering_by_shift',
  OfferingByDateShift = 'offering_by_date_shift',

  //* Family House, Fasting Zonal, Vigil Zonal
  OfferingByZone = 'offering_by_zone', 
  OfferingByDateZone = 'offering_by_date_zone',

  //* Offering Family House
  OfferingByDateCodeHouse = 'offering_by_date_code_house',
  OfferingByCodeHouse = 'offering_by_code_house',
  OfferingByPreacherNames = 'offering_by_preacher_names',
  OfferingByPreacherLastNames = 'offering_by_preacher_last_names',
  OfferingByPreacherFullName = 'offering_by_preacher_full_name',

  //* Offering Ayuno y Vigilia Zonal
  OfferingBySupervisorNames = 'offering_by_supervisor_names',
  OfferingBySupervisorLastNames = 'offering_by_supervisor_last_names',
  OfferingBySupervisorFullName = 'offering_by_supervisor_full_name',

  //* Offering Ground Church and Special
  OfferingByNames = 'offering_by_names',
  OfferingByLastNames = 'offering_by_last_names',
  OfferingByFullName = 'offering_by_full_name',

  // ! Offering Expenses
  //* Operational Expenses
  VenueRental = "venue_rental",
  PublicServices = "public_services",
  AdvertisingAndEventPromotion = "advertising_and_event_promotion",
  TravelAndTransportation = "travel_and_transportation",
  SecurityAndSurveillance = "security_and_surveillance",
  OtherAdministrativeExpenses = "other_administrative_expenses",

  //* Maintenance and Repair Expenses
  PlumbingServices = "plumbing_services",
  ElectricalServices = "electrical_services",
  PaintingAndTouchUpsServices = "painting_and_touch_ups_services",
  DeepCleaningServices = "deep_cleaning_services",
  HeatingAndACSystemMaintenance = "heating_and_ac_system_maintenance",
  SoundAndLightingEquipmentRepairAndMaintenance = "sound_and_lighting_equipment_repair_and_maintenance",
  GardenAndExteriorMaintenance = "garden_and_exterior_maintenance",
  OtherEquipmentRepairsAndMaintenance = "other_equipment_repairs_and_maintenance",
  FurnitureRepairAndMaintenance = "furniture_repair_and_maintenance",
  ComputerEquipmentRepairAndMaintenance = "computer_equipment_repair_and_maintenance",
  RoofAndStructuralRepairs = "roof_and_structural_repairs",
  DoorAndWindowRepairs = "door_and_window_repairs",

  //* Decoration Expenses
  PurchaseFlowersAndPlants = "purchase_flowers_and_plants",
  PurchaseDecorativeFurniture = "purchase_decorative_furniture",
  PurchaseDecorativeItems = "purchase_decorative_items",
  AltarAndWorshipAreaDecorationService = "altar_and_worship_area_decoration_service",

  //* Equipment and Technology Expenses
  SoundEquipment = "sound_equipment",
  ComputerEquipment = "computer_equipment",
  ProjectionEquipment = "projection_equipment",
  HvacEquipment = "hvac_equipment",
  LightingEquipment = "lighting_equipment",
  SecurityEquipment = "security_equipment",
  OfficeEquipment = "office_equipment",
  AudioVideoRecordingEquipment = "audio_video_recording_equipment",
  Furniture = "furniture",
  MusicalInstruments = "musical_instruments",
  InternetTelecommunicationsServices = "internet_and_telecommunications_services",
  HostingSoftwareServices = "hosting_and_software_services",

  //* Supplies Expenses
  KitchenUtensils = "kitchen_utensils",
  OfficeSupplies = "office_supplies",
  CookingIngredients = "cooking_ingredients",
  CleaningMaterials = "cleaning_materials",
  PackagingMaterials = "packaging_and_storage_materials",
  SundaySchoolMaterials = "sunday_school_educational_materials",

  //* Activities and Events Expenses
  SpecialGuestFees = "fees_special_guests",
  ExternalVenueRental = "rental_external_venues",
  DecorationsAndAmbiance = "decorations_and_ambiance",
  FoodAndBeverage = "food_beverage",
  PromotionalMaterials = "promotional_materials",
  TransportationSpecialGuests = "transportation_special_guests",
  EquipmentTransportation = "equipment_transportation",
  SupportStaffFees = "fees_support_staff",
  RentalTechnicalAndLogisticEquipment = "rental_technical_and_logistical_equipment",
  EducationalMaterialsAndResources = "educational_materials_and_resources",
  GiftsAndPrizesParticipants = "gifts_and_prizes_participants",
  OtherRelatedExpenses = "other_related_expenses",

  //* Users
  UserByNames = 'user_by_names',
  UserByLastNames = 'user_by_last_names',
  UserByFullName = 'user_by_full_name',
  UserByRoles = 'user_by_roles' 
}


export const SearchSubTypeNames: Record<SearchSubType, string> =  {

  //* Disciple
  by_disciple_names : 'Por sus nombres',
  by_disciple_last_names : 'Por sus apellidos',
  by_disciple_full_name : 'Por sus nombres y apellidos',
  disciple_by_pastor_names : 'Por nombres de su pastor',
  disciple_by_pastor_last_names : 'Por apellidos de su pastor',
  disciple_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  disciple_by_copastor_names : 'Por nombres de su co-pastor',
  disciple_by_copastor_last_names : 'Por apellidos de su co-pastor',
  disciple_by_copastor_full_name : 'Por nombres y apellidos de su co-pastor',
  disciple_by_supervisor_names : 'Por nombres de su supervisor',
  disciple_by_supervisor_last_names : 'Por apellidos de su supervisor',
  disciple_by_supervisor_full_name : 'Por nombres y apellidos de su supervisor',
  disciple_by_preacher_names : 'Por nombres de su predicador',
  disciple_by_preacher_last_names : 'Por apellidos de su predicador',
  disciple_by_preacher_full_name : 'Por nombres y apellidos de su predicador',

  //* Copastor
  copastor_by_pastor_names : 'Por nombres de su pastor',
  copastor_by_pastor_last_names : 'Por apellidos de su pastor',
  copastor_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  by_copastor_names : 'Por sus nombres',
  by_copastor_last_names : 'Por sus apellidos',
  by_copastor_full_name : 'Por sus nombres y apellidos',

  //* Supervisor
  supervisor_by_pastor_names: 'Por nombres de su pastor',
  supervisor_by_pastor_last_names: 'Por apellidos de su pastor',
  supervisor_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  supervisor_by_copastor_names: 'Por nombres de su co-pastor',
  supervisor_by_copastor_last_names: 'Por apellidos de su co-pastor',
  supervisor_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  by_supervisor_names: 'Por sus nombres',
  by_supervisor_last_names: 'Por sus apellidos',
  by_supervisor_full_name: 'Por sus nombres y apellidos',

  //* Preacher
  preacher_by_pastor_names: 'Por nombres de su pastor',
  preacher_by_pastor_last_names: 'Por apellidos de su pastor',
  preacher_by_pastor_full_name: 'Por nombres y apellidos de su pastor',
  preacher_by_copastor_names: 'Por nombres de su co-pastor',
  preacher_by_copastor_last_names: 'Por apellidos de su co-pastor',
  preacher_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  preacher_by_supervisor_names: 'Por nombres de su supervisor',
  preacher_by_supervisor_last_names: 'Por apellidos de su supervisor',
  preacher_by_supervisor_full_name: 'Por nombres y apellidos de su supervisor',
  by_preacher_names: 'Por sus nombres',
  by_preacher_last_names: 'Por sus apellidos',
  by_preacher_full_name: 'Por sus nombres y apellidos',

  //* Leaders
  leader_by_pastor_names : 'Por nombres de su pastor',
  leader_by_pastor_last_names : 'Por apellidos de su pastor',
  leader_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  leader_by_copastor_names: 'Por nombres de su co-pastor',
  leader_by_copastor_last_names: 'Por apellidos de su co-pastor',
  leader_by_copastor_full_name: 'Por nombres y apellidos de su co-pastor',
  leader_by_supervisor_names: 'Por nombres de su supervisor',
  leader_by_supervisor_last_names: 'Por apellidos de su supervisor',
  leader_by_supervisor_full_name: 'Por nombres y apellidos de su supervisor',
  by_leader_names: 'Por sus nombres',
  by_leader_last_names: 'Por sus apellidos',
  by_leader_full_name: 'Por sus nombres y apellidos',

  //* Family House
  family_house_by_pastor_names : 'Por nombres de su pastor',
  family_house_by_pastor_last_names : 'Por apellidos de su pastor',
  family_house_by_pastor_full_name : 'Por nombres y apellidos de su pastor',
  family_house_by_copastor_names : 'Por nombres de su co-pastor',
  family_house_by_copastor_last_names : 'Por apellidos de su co-pastor',
  family_house_by_copastor_full_name : 'Por nombres y apellidos de su co-pastor',
  family_house_by_supervisor_names : 'Por nombres de su supervisor',
  family_house_by_supervisor_last_names : 'Por apellidos de su supervisor',
  family_house_by_supervisor_full_name : 'Por nombres y apellidos de su supervisor',
  family_house_by_preacher_names : 'Por nombres de su predicador',
  family_house_by_preacher_last_names : 'Por apellidos de su predicador',
  family_house_by_preacher_full_name : 'Por nombres y apellidos de su predicador',

  //* Tithe
  tithe_by_names : 'Por nombres',
  tithe_by_last_names : 'Por apellidos',
  tithe_by_full_name : 'Por nombres y apellidos',
  tithe_by_date : 'Por fecha',
  tithe_by_date_names : 'Por nombres y fecha',
  tithe_by_date_last_names : 'Por apellidos y fechas',
  tithe_by_date_full_name : 'Por nombres, apellidos y fecha',


  //* Offering Income
  //* Sunday Worship, Family House, Fasting Zonal, Fasting General, Vigil Zonal, vigilia General, Ground Church, Activities, Youngs
  offering_by_date : 'Por fecha',

  //* Sunday Worship, youngs, school sunday
  offering_by_shift : 'Por turno',
  offering_by_date_shift : 'Por fecha y turno',


  //* Family House, Fasting Zonal, Vigil Zonal
  offering_by_zone : 'Por zona',
  offering_by_date_zone : 'Por zona y fecha',

  //* Family House
  offering_by_preacher_names : 'Por nombres de su predicador',
  offering_by_preacher_last_names : 'Por apellidos de su predicador',
  offering_by_preacher_full_name : 'Por nombres y apellidos de su predicador',
  offering_by_code_house : 'Por código de casa',
  offering_by_date_code_house : 'Por código y fecha',

  //* Offering Ayuno Zonal y Vigilia Zonal
  offering_by_supervisor_names : 'Por nombres de su supervisor',
  offering_by_supervisor_last_names : 'Por apellidos de su supervisor',
  offering_by_supervisor_full_name : 'Por nombres y apellidos de su supervisor',

  //* Offering Ground Church and Special
  offering_by_names : 'Por nombres del aportante',
  offering_by_last_names : 'Por apellidos del aportante',
  offering_by_full_name : 'Por nombres y apellidos del aportante',

  //* Users
  user_by_names : 'Por sus nombres',
  user_by_last_names: 'Por sus apellidos',
  user_by_full_name: 'Por sus nombres y apellidos',
  user_by_roles: 'Por sus roles',

  //* Offering Expenses
  //* Operative Expenses
  venue_rental : 'Alquiler de local',
  public_services : 'Servicios públicos',
  advertising_and_event_promotion : 'Publicidad y promoción de eventos',
  travel_and_transportation : 'Viaje y transporte',
  security_and_surveillance : 'Seguridad y vigilancia',
  other_administrative_expenses : 'Otros gastos administrativos',

  //* Maintenance and Repair Expenses
  plumbing_services : 'Servicios de gasfiteria',
  electrical_services : 'Servicios de electricidad',
  painting_and_touch_ups_services : 'Servicios de pintura y retoques',
  deep_cleaning_services : 'Servicios de limpieza profunda',
  heating_and_ac_system_maintenance : 'Mantenimiento de sistemas de calefacción y AC',
  sound_and_lighting_equipment_repair_and_maintenance : 'Mantenimiento de equipos de sonido e iluminación',
  garden_and_exterior_maintenance : 'Mantenimiento de jardines y exteriores',
  furniture_repair_and_maintenance : 'Mantenimiento de muebles ',
  computer_equipment_repair_and_maintenance : 'Mantenimiento de equipos informáticos',
  other_equipment_repairs_and_maintenance : 'Mantenimiento de otros equipos',
  roof_and_structural_repairs : 'Reparación de techo y estructuras',
  door_and_window_repairs : 'Reparación de puertas y ventanas',

  //* Decoration Expenses
  purchase_flowers_and_plants : 'Adquisición de flores y plantas',
  purchase_decorative_furniture : 'Adquisición de muebles decorativos',
  purchase_decorative_items : 'Adquisición de elementos decorativos',
  altar_and_worship_area_decoration_service : 'Servicio de decoración de altar y areas de culto',

  //* Equipment and Technology Expenses
  sound_equipment : 'Equipos de sonido',
  projection_equipment : 'Equipos de proyección',
  hvac_equipment : 'Equipos de ventilación, calefacción y AC',
  lighting_equipment : 'Equipos de iluminación',
  security_equipment : 'Equipos de seguridad',
  office_equipment : 'Equipos de oficina',
  computer_equipment : 'Equipos informáticos',
  audio_video_recording_equipment : 'Equipos de grabación de audio/video',
  furniture : 'Mobiliario',
  musical_instruments : 'Instrumentos musicales',
  internet_and_telecommunications_services : 'Servicios de internet y telecomunicaciones',
  hosting_and_software_services   : 'Servicios de Hosting y Software',

  //* Supplies Expenses
  kitchen_utensils : 'Utensilios de cocina',
  cooking_ingredients : 'Ingredientes de cocina',
  office_supplies : 'Utensilios de oficina',
  cleaning_materials : 'Materiales de limpieza',
  packaging_and_storage_materials : 'Materiales de almacenamiento',
  sunday_school_educational_materials : ' Material educativo Esc. Dominical',

  //* Activities and Events Expenses
  fees_special_guests : 'Honorarios para invitados especiales',
  fees_support_staff : 'Honorarios de personal de apoyo',
  rental_external_venues : 'Alquiler de locales externos',
  rental_technical_and_logistical_equipment : 'Alquiler de equipos técnicos y logísticos',
  transportation_special_guests : 'Transporte para invitados especiales',
  equipment_transportation : 'Transporte de equipos',
  food_beverage : 'Comida y bebida',
  decorations_and_ambiance : 'Decoraciones y ambientación',
  promotional_materials : 'Material promocional',
  educational_materials_and_resources : 'Material didáctico y recursos',
  gifts_and_prizes_participants : 'Regalos y premios para participantes',
  other_related_expenses : ' Otros gastos relacionados',
}

