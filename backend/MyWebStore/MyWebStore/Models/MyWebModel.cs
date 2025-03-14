using System.Security.Cryptography.X509Certificates;
using LiteDB;

namespace MyWebStore.Models
{
    public class OrderItems
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public int RecruiterId { get; set; }
        public int DivisionId { get; set; }
        public int CompanyId { get; set; }
        public bool Validated {  get; set; }
        public DateTime Created { get; set; }
        public DateTime? Completed { get; set; }
        public List<TransactionItems> Items { get; set; } = new();
    }

    public class TransactionItems
    { 
        public int Id { get; set; }
        public int SiteId { get; set; }
        public int ProductId { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public int RetailCost { get; set; }
        public int AccountDiscount { get; set; }
        public int CouponDiscount { get; set; }
        public int NetCost { get; set; }
        public JobItems JobData { get; set; } = new();
    }

    public class JobItems
    { 
        public int JobId { get; set; }
        public int PostingId { get; set; }
    }

    public class ProductItems
    {
        [BsonId]
        public int Product_Id { get; set; }

        [BsonField("site_id")]
        public int Site_Id { get; set; }

        [BsonField("product_name")]
        public string Product_Name { get; set; } = string.Empty;

        [BsonField("cost")]
        public int Cost { get; set; }

        [BsonField("inventory_only")]
        public bool InventoryOnly { get; set; }

        [BsonField("private")]
        public bool Private { get; set; }
    }
}
