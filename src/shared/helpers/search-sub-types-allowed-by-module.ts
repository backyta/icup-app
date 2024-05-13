import { SearchSubType } from '@/shared/enums';

// * Subtypes allowed

  //* Disciple
  export const SearchSubtypesNamesDiscipleModuleAllowed = [ 
    SearchSubType.MemberByPastorNames,
    SearchSubType.MemberByCopastorNames,
    SearchSubType.MemberBySupervisorNames,
    SearchSubType.MemberByPreacherNames,
    SearchSubType.ByMemberNames,
  ];

  export const SearchSubtypesLastNamesDiscipleModuleAllowed = [ 
    SearchSubType.MemberByPastorLastNames,
    SearchSubType.MemberByCopastorLastNames,
    SearchSubType.MemberBySupervisorLastNames,
    SearchSubType.MemberByPreacherLastNames,
    SearchSubType.ByMemberLastNames,
  ];

  export const SearchSubtypesFullNameDiscipleModuleAllowed = [ 
    SearchSubType.MemberByPastorFullName,
    SearchSubType.MemberByCopastorFullName,
    SearchSubType.MemberBySupervisorFullName,
    SearchSubType.MemberByPreacherFullName,
    SearchSubType.ByMemberFullName,
  ];

  //* Pastor
  export const SearchSubtypesNamesPastorModuleAllowed = [ 
    SearchSubType.ByPastorNames,
  ];

  export const SearchSubtypesLastNamesPastorModuleAllowed = [ 
    SearchSubType.ByPastorLastNames,
  ];

  export const SearchSubtypesFullNamePastorModuleAllowed = [ 
    SearchSubType.ByPastorFullName,
  ];
  
  //* Co-Pastor
  export const SearchSubtypesNamesCopastorModuleAllowed = [ 
    SearchSubType.CopastorByPastorNames,
    SearchSubType.ByCopastorNames,
  ];

  export const SearchSubtypesLastNamesCopastorModuleAllowed = [ 
    SearchSubType.CopastorByPastorLastNames,
    SearchSubType.ByCopastorLastNames,
  ];

  export const SearchSubtypesFullNameCopastorModuleAllowed = [ 
    SearchSubType.CopastorByPastorFullName,
    SearchSubType.ByCopastorFullName,
  ];

  //* Leader
  export const SearchSubtypesNamesLeaderModuleAllowed = [ 
    SearchSubType.LeaderByPastorNames,
    SearchSubType.LeaderByCopastorNames,
    SearchSubType.LeaderBySupervisorNames,
    SearchSubType.ByLeaderNames,
  ];

  export const SearchSubtypesLastNamesLeaderModuleAllowed = [ 
    SearchSubType.LeaderByPastorLastNames,
    SearchSubType.LeaderByCopastorLastNames,
    SearchSubType.LeaderBySupervisorLastNames,
    SearchSubType.ByLeaderLastNames,
  ];

  export const SearchSubtypesFullNameLeaderModuleAllowed = [ 
    SearchSubType.LeaderByPastorFullName,
    SearchSubType.LeaderByCopastorFullName,
    SearchSubType.LeaderBySupervisorFullName,
    SearchSubType.ByLeaderFullName,
  ];

  //* Family House
  export const SearchSubtypesNamesFamilyHouseModuleAllowed = [ 
    SearchSubType.FamilyHouseByPastorNames,
    SearchSubType.FamilyHouseByCopastorNames,
    SearchSubType.FamilyHouseBySupervisorNames,
    SearchSubType.FamilyHouseByPreacherNames,
  ];

  export const SearchSubtypesLastNamesFamilyHouseModuleAllowed = [ 
    SearchSubType.FamilyHouseByPastorLastNames,
    SearchSubType.FamilyHouseByCopastorLastaNames,
    SearchSubType.FamilyHouseBySupervisorLastNames,
    SearchSubType.FamilyHouseByPreacherLastNames,
  ];

  export const SearchSubtypesFullNameFamilyHouseModuleAllowed = [ 
    SearchSubType.FamilyHouseByPastorFullName,
    SearchSubType.FamilyHouseByCopastorFullName,
    SearchSubType.FamilyHouseBySupervisorFullName,
    SearchSubType.FamilyHouseByPreacherFullName,
  ];

  //* Offering (Tithe)
  export const SearchSubtypesTitheAllowed = [ 
    SearchSubType.TitheByNames,
    SearchSubType.TitheByLastNames,
    SearchSubType.TitheByFullName,
    SearchSubType.TitheByDate,
    SearchSubType.TitheByDateNames,
    SearchSubType.TitheByDateLastNames,
    SearchSubType.TitheByDateFullName,
  ];

  //! Offering Income
  //* Offering (Sunday Worship, Sunday School)
  export const SearchSubtypesOfferingIncomeSundayWorshipAllowed = [ 
    SearchSubType.OfferingByDate,
    SearchSubType.OfferingByShift,
    SearchSubType.OfferingByDateShift,
  ];

  //* Offering (Family House)
  export const SearchSubtypesOfferingIncomeFamilyHouseAllowed = [ 
    SearchSubType.OfferingByPreacherNames,
    SearchSubType.OfferingByPreacherLastNames,
    SearchSubType.OfferingByPreacherFullName,
    SearchSubType.OfferingByZone,
    SearchSubType.OfferingByCodeHouse,
    SearchSubType.OfferingByDate,
    SearchSubType.OfferingByDateZone,
    SearchSubType.OfferingByDateCodeHouse,
  ];

  //* Offering (Fasting, Vigil General)
  export const SearchSubtypesOfferingIncomeFastingAndVigilGeneralAllowed = [ 
    SearchSubType.OfferingByDate,
  ];

  //* Offering (Fasting, Vigil Zonal)
  export const SearchSubtypesOfferingIncomeFastingAndVigilZonalAllowed = [ 
    SearchSubType.OfferingByDate,
    SearchSubType.OfferingByZone,
    SearchSubType.OfferingByDateZone,
    SearchSubType.OfferingBySupervisorNames,
    SearchSubType.OfferingBySupervisorLastNames,
    SearchSubType.OfferingBySupervisorFullName,
  ];

  //* Offering (Young Worship)
  export const SearchSubTypesOfferingIncomeYoungWorshipAllowed = [ 
    SearchSubType.OfferingByDate,
  ];

  //* Offering (Worship United)
  export const SearchSubTypesOfferingIncomeUnitedWorshipAllowed = [ 
    SearchSubType.OfferingByDate,
  ];

  //* Offering (Income Adjustment)
  export const SearchSubTypesOfferingIncomeIncomeAdjustmentAllowed = [ 
    SearchSubType.OfferingByDate,
  ];

  //* Offering (Activities)
  export const SearchSubTypesOfferingIncomeActivitiesAllowed = [ 
    SearchSubType.OfferingByDate,
  ];

  //* Offering (Ground Church, Special)
  export const SearchSubTypesOfferingIncomeGroundChurchAllowed = [ 
    SearchSubType.OfferingByDate,
    SearchSubType.OfferingByNames,
    SearchSubType.OfferingByLastNames,
    SearchSubType.OfferingByFullName,
  ];

  //! Offering Expenses
  //* Operational Expenses
  export const SearchSubTypesOfferingExpensesOperationalAllowed = [ 
    SearchSubType.VenueRental,
    SearchSubType.PublicServices,
    SearchSubType.TravelAndTransportation,
    SearchSubType.SecurityAndSurveillance,
    SearchSubType.OtherAdministrativeExpenses,
  ];
   
  //* MaintenanceAndRepairExpenses
  export const SearchSubTypesOfferingExpensesMaintenanceAndRepairAllowed = [ 
    SearchSubType.PlumbingServices,
    SearchSubType.ElectricalServices,
    SearchSubType.PaintingAndTouchUpsServices,
    SearchSubType.DeepCleaningServices,
    SearchSubType.HeatingAndACSystemMaintenance,
    SearchSubType.SoundAndLightingEquipmentRepairAndMaintenance,
    SearchSubType.GardenAndExteriorMaintenance,
    SearchSubType.OtherEquipmentRepairsAndMaintenance,
    SearchSubType.FurnitureRepairAndMaintenance,
    SearchSubType.ComputerEquipmentRepairAndMaintenance,
    SearchSubType.RoofAndStructuralRepairs,
    SearchSubType.DoorAndWindowRepairs,
  ];

  //* DecorationExpenses
  export const SearchSubTypesOfferingExpensesDecorationAllowed = [ 
    SearchSubType.PurchaseFlowersAndPlants,
    SearchSubType.PurchaseDecorativeFurniture,
    SearchSubType.PurchaseDecorativeItems,
    SearchSubType.AltarAndWorshipAreaDecorationService,
  ];

  //* EquipmentAndTechnologyExpenses
  export const SearchSubTypesOfferingExpensesEquipmentAndTechnologyAllowed = [ 
    SearchSubType.SoundEquipment,
    SearchSubType.ComputerEquipment,
    SearchSubType.ProjectionEquipment,
    SearchSubType.HvacEquipment,
    SearchSubType.LightingEquipment,
    SearchSubType.SecurityEquipment,
    SearchSubType.OfficeEquipment,
    SearchSubType.AudioVideoRecordingEquipment,
    SearchSubType.Furniture,
    SearchSubType.MusicalInstruments,
    SearchSubType.InternetTelecommunicationsServices,
    SearchSubType.HostingSoftwareServices,
  ];

  //* SuppliesExpenses
  export const SearchSubTypesOfferingExpensesSuppliesAllowed = [ 
    SearchSubType.KitchenUtensils,
    SearchSubType.OfficeSupplies,
    SearchSubType.CookingIngredients,
    SearchSubType.CleaningMaterials,
    SearchSubType.PackagingMaterials,
    SearchSubType.SundaySchoolMaterials,
  ];
    
  //* ActivitiesAndEventsExpenses
  export const SearchSubTypesOfferingExpensesActivitiesAndEventsAllowed = [ 
    SearchSubType.AdvertisingAndEventPromotion,
    SearchSubType.SpecialGuestFees,
    SearchSubType.ExternalVenueRental,
    SearchSubType.DecorationsAndAmbiance,
    SearchSubType.FoodAndBeverage,
    SearchSubType.PromotionalMaterials,
    SearchSubType.TransportationSpecialGuests,
    SearchSubType.EquipmentTransportation,
    SearchSubType.SupportStaffFees,
    SearchSubType.RentalTechnicalAndLogisticEquipment,
    SearchSubType.EducationalMaterialsAndResources,
    SearchSubType.GiftsAndPrizesParticipants,
    SearchSubType.OtherRelatedExpenses,
  ];

  //* Expenses Adjustment
  export const SearchSubTypesOfferingExpensesExpensesAdjustmentAllowed = [ 
    SearchSubType.OfferingByDate,
  ];
  

  //* User
  export const SearchSubtypesNamesUserModuleAllowed = [ 
    SearchSubType.UserByNames,
  ];

  export const SearchSubtypesLastNamesUserModuleAllowed = [ 
    SearchSubType.UserByLastNames,
    
  ];

  export const SearchSubtypesFullNameUserModuleAllowed = [ 
    SearchSubType.UserByFullName,
  ];
