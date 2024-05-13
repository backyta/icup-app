export enum SubTypesOfferingExpenses {
  //* Operative Expenses
  VenueRental = "venue_rental",
  PublicServices = "public_services",
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
  AdvertisingAndEventPromotion = "advertising_and_event_promotion",
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
  OtherRelatedExpenses = "other_related_expenses"
}

export const SubTypesOfferingExpensesNames: Record<SubTypesOfferingExpenses, string> = {

  //* Operative Expenses
  venue_rental : 'Alquiler de local',
  public_services : 'Servicios públicos',
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
  furniture_repair_and_maintenance : ' Mantenimiento de muebles',
  computer_equipment_repair_and_maintenance : 'Mantenimiento de equipos informáticos',
  other_equipment_repairs_and_maintenance : ' Mantenimiento de otros equipos',
  roof_and_structural_repairs : ' Reparación de techo y estructuras',
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
  internet_and_telecommunications_services : ' Servicios de internet y telecomunicaciones',
  hosting_and_software_services   : 'Servicios de Hosting y Software',

  //* Supplies Expenses
  kitchen_utensils : 'Utensilios de cocina',
  cooking_ingredients : 'Ingredientes de cocina',
  office_supplies : 'Utensilios de oficina',
  cleaning_materials : 'Materiales de limpieza',
  packaging_and_storage_materials : 'Materiales de almacenamiento',
  sunday_school_educational_materials : 'Material educativo Esc. Dominical',

  //* Activities and Events Expenses
  advertising_and_event_promotion : 'Publicidad y promoción de eventos',
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
};


