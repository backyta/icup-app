import { SearchSubType } from '@/shared/enums';


// TODO : eliminar esto y su validación porque cada modulo ya tiene
// * Subtypes allowed 

  //* Disciple
  export const SearchDiscipleNamesSubTypesAllowedByModule = [ 
    SearchSubType.DiscipleByPastorNames,
    SearchSubType.DiscipleByCopastorNames,
    SearchSubType.DiscipleBySupervisorNames,
    SearchSubType.DiscipleByPreacherNames,
    SearchSubType.ByDiscipleNames,
  ];

  export const SearchDiscipleLastNamesSubTypesAllowedByModule = [ 
    SearchSubType.DiscipleByPastorLastNames,
    SearchSubType.DiscipleByCopastorLastNames,
    SearchSubType.DiscipleBySupervisorLastNames,
    SearchSubType.DiscipleByPreacherLastNames,
    SearchSubType.ByDiscipleLastNames,
  ];

  export const SearchDiscipleFullNamesSubTypesAllowedByModule = [ 
    SearchSubType.DiscipleByPastorFullName,
    SearchSubType.DiscipleByCopastorFullName,
    SearchSubType.DiscipleBySupervisorFullName,
    SearchSubType.DiscipleByPreacherFullName,
    SearchSubType.ByDiscipleFullName,
  ];


  //* Co-Pastor
  export const SearchCopastorNamesSubTypesAllowedByModule = [ 
    SearchSubType.CopastorByPastorNames,
    SearchSubType.ByCopastorNames,
  ];

  export const SearchCopastorLastNamesSubTypesAllowedByModule = [ 
    SearchSubType.CopastorByPastorLastNames,
    SearchSubType.ByCopastorLastNames,
  ];

  export const SearchCopastorFullNamesSubTypesAllowedByModule = [ 
    SearchSubType.CopastorByPastorFullName,
    SearchSubType.ByCopastorFullName,
  ];

  //* Supervisor
  export const SearchSupervisorNamesSubTypesAllowedByModule = [ 
    SearchSubType.SupervisorByPastorNames,
    SearchSubType.SupervisorByCopastorNames,
    SearchSubType.BySupervisorNames,
  ];

  export const SearchSupervisorLastNamesSubTypesAllowedByModule = [ 
    SearchSubType.SupervisorByPastorLastNames,
    SearchSubType.SupervisorByCopastorLastNames,
    SearchSubType.BySupervisorLastNames,
  ];

  export const SearchSupervisorFullNamesSubTypesAllowedByModule = [ 
    SearchSubType.SupervisorByPastorFullName,
    SearchSubType.SupervisorByCopastorFullName,
    SearchSubType.BySupervisorFullName,
  ];

  //* Preacher
  export const SearchPreacherNamesSubTypesAllowedByModule = [ 
    SearchSubType.PreacherByPastorNames,
    SearchSubType.PreacherByCopastorNames,
    SearchSubType.PreacherBySupervisorNames,
    SearchSubType.ByPreacherNames,
  ];

  export const SearchPreacherLastNamesSubTypesAllowedByModule = [ 
    SearchSubType.PreacherByPastorLastNames,
    SearchSubType.PreacherByCopastorLastNames,
    SearchSubType.PreacherBySupervisorLastNames,
    SearchSubType.ByPreacherLastNames,
  ];

  export const SearchPreacherFullNamesSubTypesAllowedByModule = [ 
    SearchSubType.PreacherByPastorFullName,
    SearchSubType.PreacherByCopastorFullName,
    SearchSubType.PreacherBySupervisorFullName,
    SearchSubType.ByPreacherFullName,
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
