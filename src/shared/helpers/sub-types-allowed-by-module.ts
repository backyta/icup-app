import { SubTypesSearch } from "@/shared/enums";

// ? Subtypes allowed
  //* Disciple
  export const SubtypesNamesDiscipleAllowed = [ 
    SubTypesSearch.MemberByPastorNames,
    SubTypesSearch.MemberByCopastorNames,
    SubTypesSearch.MemberBySupervisorNames,
    SubTypesSearch.MemberByPreacherNames,
    SubTypesSearch.ByMemberNames,
  ];

  export const SubtypesLastNamesDiscipleAllowed = [ 
    SubTypesSearch.MemberByPastorLastNames,
    SubTypesSearch.MemberByCopastorLastNames,
    SubTypesSearch.MemberBySupervisorLastNames,
    SubTypesSearch.MemberByPreacherLastNames,
    SubTypesSearch.ByMemberLastNames,
  ];

  export const SubtypesFullNameDiscipleAllowed = [ 
    SubTypesSearch.MemberByPastorFullName,
    SubTypesSearch.MemberByCopastorFullName,
    SubTypesSearch.MemberBySupervisorFullName,
    SubTypesSearch.MemberByPreacherFullName,
    SubTypesSearch.ByMemberFullName,
  ];

  //* Pastor
  export const SubtypesNamesPastorAllowed = [ 
    SubTypesSearch.ByPastorNames,
  ];

  export const SubtypesLastNamesPastorAllowed = [ 
    SubTypesSearch.ByPastorLastNames,
  ];

  export const SubtypesFullNamePastorAllowed = [ 
    SubTypesSearch.ByPastorFullName,
  ];
  
  //* Co-Pastor
  export const SubtypesNamesCopastorAllowed = [ 
    SubTypesSearch.CopastorByPastorNames,
    SubTypesSearch.ByCopastorNames,
  ];

  export const SubtypesLastNamesCopastorAllowed = [ 
    SubTypesSearch.CopastorByPastorLastNames,
    SubTypesSearch.ByCopastorLastNames,
  ];

  export const SubtypesFullNameCopastorAllowed = [ 
    SubTypesSearch.CopastorByPastorFullName,
    SubTypesSearch.ByCopastorFullName,
  ];

  //* Leader
  export const SubtypesNamesLeaderAllowed = [ 
    SubTypesSearch.LeaderByPastorNames,
    SubTypesSearch.LeaderByCopastorNames,
    SubTypesSearch.LeaderBySupervisorNames,
    SubTypesSearch.ByLeaderNames,
  ];

  export const SubtypesLastNamesLeaderAllowed = [ 
    SubTypesSearch.LeaderByPastorLastNames,
    SubTypesSearch.LeaderByCopastorLastNames,
    SubTypesSearch.LeaderBySupervisorLastNames,
    SubTypesSearch.ByLeaderLastNames,
  ];

  export const SubtypesFullNameLeaderAllowed = [ 
    SubTypesSearch.LeaderByPastorFullName,
    SubTypesSearch.LeaderByCopastorFullName,
    SubTypesSearch.LeaderBySupervisorFullName,
    SubTypesSearch.ByLeaderFullName,
  ];

  //* Family House
  export const SubtypesNamesFamilyHouseAllowed = [ 
    SubTypesSearch.FamilyHouseByPastorNames,
    SubTypesSearch.FamilyHouseByCopastorNames,
    SubTypesSearch.FamilyHouseBySupervisorNames,
    SubTypesSearch.FamilyHouseByPreacherNames,
  ];

  export const SubtypesLastNamesFamilyHouseAllowed = [ 
    SubTypesSearch.FamilyHouseByPastorLastNames,
    SubTypesSearch.FamilyHouseByCopastorLastaNames,
    SubTypesSearch.FamilyHouseBySupervisorLastNames,
    SubTypesSearch.FamilyHouseByPreacherLastNames,
  ];

  export const SubtypesFullNameFamilyHouseAllowed = [ 
    SubTypesSearch.FamilyHouseByPastorFullName,
    SubTypesSearch.FamilyHouseByCopastorFullName,
    SubTypesSearch.FamilyHouseBySupervisorFullName,
    SubTypesSearch.FamilyHouseByPreacherFullName,
  ];

  //* Offering (Tithe)
  export const SubtypesTitheAllowed = [ 
    SubTypesSearch.TitheByNames,
    SubTypesSearch.TitheByLastNames,
    SubTypesSearch.TitheByFullName,
    SubTypesSearch.TitheByDate,
    SubTypesSearch.TitheByDateNames,
    SubTypesSearch.TitheByDateLastNames,
    SubTypesSearch.TitheByDateFullName,
  ];

  //! Offering Income
  //* Offering (Sunday Worship, Sunday School)
  export const SubtypesOfferingIncomeSundayWorshipAllowed = [ 
    SubTypesSearch.OfferingByDate,
    SubTypesSearch.OfferingByShift,
    SubTypesSearch.OfferingByDateShift,
  ];

  //* Offering (Family House)
  export const SubtypesOfferingIncomeFamilyHouseAllowed = [ 
    SubTypesSearch.OfferingByPreacherNames,
    SubTypesSearch.OfferingByPreacherLastNames,
    SubTypesSearch.OfferingByPreacherFullName,
    SubTypesSearch.OfferingByZone,
    SubTypesSearch.OfferingByCodeHouse,
    SubTypesSearch.OfferingByDate,
    SubTypesSearch.OfferingByDateZone,
    SubTypesSearch.OfferingByDateCodeHouse,
  ];

  //* Offering (Fasting, Vigil General)
  export const SubtypesOfferingIncomeFastingAndVigilGeneralAllowed = [ 
    SubTypesSearch.OfferingByDate,
  ];

  //* Offering (Fasting, Vigil Zonal)
  export const SubtypesOfferingIncomeFastingAndVigilZonalAllowed = [ 
    SubTypesSearch.OfferingByDate,
    SubTypesSearch.OfferingByZone,
    SubTypesSearch.OfferingByDateZone,
    SubTypesSearch.OfferingBySupervisorNames,
    SubTypesSearch.OfferingBySupervisorLastNames,
    SubTypesSearch.OfferingBySupervisorFullName,
  ];

  //* Offering (Young Worship)
  export const SubTypesOfferingIncomeYoungWorshipAllowed = [ 
    SubTypesSearch.OfferingByDate,
  ];

  //* Offering (Activities)
  export const SubTypesOfferingIncomeActivitiesAllowed = [ 
    SubTypesSearch.OfferingByDate,
  ];

  //* Offering (Ground Church, Special)
  export const SubTypesOfferingIncomeGroundChurchAllowed = [ 
    SubTypesSearch.OfferingByDate,
    SubTypesSearch.OfferingByNames,
    SubTypesSearch.OfferingByLastNames,
    SubTypesSearch.OfferingByFullName,
  ];

  //! Offering Expenses
  //* Operational Expenses
  export const SubTypesOfferingExpensesOperationalAllowed = [ 
    SubTypesSearch.VenueRental,
    SubTypesSearch.PublicServices,
    SubTypesSearch.AdvertisingAndEventPromotion,
    SubTypesSearch.TravelAndTransportation,
    SubTypesSearch.SecurityAndSurveillance,
    SubTypesSearch.OtherAdministrativeExpenses,
  ];
   
  //* MaintenanceAndRepairExpenses
  export const SubTypesOfferingExpensesMaintenanceAndRepairAllowed = [ 
    SubTypesSearch.PlumbingServices,
    SubTypesSearch.ElectricalServices,
    SubTypesSearch.PaintingAndTouchUpsServices,
    SubTypesSearch.DeepCleaningServices,
    SubTypesSearch.HeatingAndACSystemMaintenance,
    SubTypesSearch.SoundAndLightingEquipmentRepairAndMaintenance,
    SubTypesSearch.GardenAndExteriorMaintenance,
    SubTypesSearch.OtherEquipmentRepairsAndMaintenance,
    SubTypesSearch.FurnitureRepairAndMaintenance,
    SubTypesSearch.ComputerEquipmentRepairAndMaintenance,
    SubTypesSearch.RoofAndStructuralRepairs,
    SubTypesSearch.DoorAndWindowRepairs,
  ];

  //* DecorationExpenses
  export const SubTypesOfferingExpensesDecorationAllowed = [ 
    SubTypesSearch.PurchaseFlowersAndPlants,
    SubTypesSearch.PurchaseDecorativeFurniture,
    SubTypesSearch.PurchaseDecorativeItems,
    SubTypesSearch.AltarAndWorshipAreaDecorationService,
  ];

  //* EquipmentAndTechnologyExpenses
  export const SubTypesOfferingExpensesEquipmentAndTechnologyAllowed = [ 
    SubTypesSearch.SoundEquipment,
    SubTypesSearch.ComputerEquipment,
    SubTypesSearch.ProjectionEquipment,
    SubTypesSearch.HvacEquipment,
    SubTypesSearch.LightingEquipment,
    SubTypesSearch.SecurityEquipment,
    SubTypesSearch.OfficeEquipment,
    SubTypesSearch.AudioVideoRecordingEquipment,
    SubTypesSearch.Furniture,
    SubTypesSearch.MusicalInstruments,
    SubTypesSearch.InternetTelecommunicationsServices,
    SubTypesSearch.HostingSoftwareServices,
  ];

  //* SuppliesExpenses
  export const SubTypesOfferingExpensesSuppliesAllowed = [ 
    SubTypesSearch.KitchenUtensils,
    SubTypesSearch.OfficeSupplies,
    SubTypesSearch.CookingIngredients,
    SubTypesSearch.CleaningMaterials,
    SubTypesSearch.PackagingMaterials,
    SubTypesSearch.SundaySchoolMaterials,
  ];
    
  //* ActivitiesAndEventsExpenses
  export const SubTypesOfferingExpensesActivitiesAndEventsAllowed = [ 
    SubTypesSearch.SpecialGuestFees,
    SubTypesSearch.ExternalVenueRental,
    SubTypesSearch.DecorationsAndAmbiance,
    SubTypesSearch.FoodAndBeverage,
    SubTypesSearch.PromotionalMaterials,
    SubTypesSearch.TransportationSpecialGuests,
    SubTypesSearch.EquipmentTransportation,
    SubTypesSearch.SupportStaffFees,
    SubTypesSearch.RentalTechnicalAndLogisticEquipment,
    SubTypesSearch.EducationalMaterialsAndResources,
    SubTypesSearch.GiftsAndPrizesParticipants,
    SubTypesSearch.OtherRelatedExpenses,
  ];

  //* User
  export const SubtypesNamesUserAllowed = [ 
    SubTypesSearch.UserByNames,
  ];

  export const SubtypesLastNamesUserAllowed = [ 
    SubTypesSearch.UserByLastNames,
    
  ];

  export const SubtypesFullNameUserAllowed = [ 
    SubTypesSearch.UserByFullName,
  ];
