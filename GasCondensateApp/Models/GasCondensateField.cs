namespace GasCondensateApp.Models
{
    public class GasCondensateField
    {
        public int Id { get; set; }
        public string FieldName { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int ProductionRate { get; set; } // barrels/day
        public decimal Cost { get; set; }
        public int YearOfExtraction { get; set; }
        public string MaintenanceType { get; set; }
    }
}