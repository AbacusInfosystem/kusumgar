﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KusumgarDatabaseEntities
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class KusumgarEntities : DbContext
    {
        public KusumgarEntities()
            : base("name=KusumgarEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<M_Quality_Application_Mapping> M_Quality_Application_Mapping { get; set; }
        public DbSet<M_Samples> M_Samples { get; set; }
        public DbSet<Supporting_Details> Supporting_Details { get; set; }
        public DbSet<M_Application> M_Application { get; set; }
        public DbSet<Temp_Customer_Quality_Details> Temp_Customer_Quality_Details { get; set; }
        public DbSet<M_Customer_Quality> M_Customer_Quality { get; set; }
        public DbSet<M_G_Article> M_G_Article { get; set; }
        public DbSet<Bank_Details> Bank_Details { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Contact_Custom_Fields> Contact_Custom_Fields { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Customer_Addresss> Customer_Addresss { get; set; }
        public DbSet<Customer_Contact_Type> Customer_Contact_Type { get; set; }
        public DbSet<M_Access_Function> M_Access_Function { get; set; }
        public DbSet<M_Attribute_Code> M_Attribute_Code { get; set; }
        public DbSet<M_C_Article> M_C_Article { get; set; }
        public DbSet<M_Category> M_Category { get; set; }
        public DbSet<M_Consumable> M_Consumable { get; set; }
        public DbSet<M_Consumable_Vendors> M_Consumable_Vendors { get; set; }
        public DbSet<M_Defect_Type> M_Defect_Type { get; set; }
        public DbSet<M_Fabric_Type> M_Fabric_Type { get; set; }
        public DbSet<M_Factory> M_Factory { get; set; }
        public DbSet<M_Industrial> M_Industrial { get; set; }
        public DbSet<M_Industrial_Category> M_Industrial_Category { get; set; }
        public DbSet<M_Industrial_Group> M_Industrial_Group { get; set; }
        public DbSet<M_Industrial_Vendors> M_Industrial_Vendors { get; set; }
        public DbSet<M_Material> M_Material { get; set; }
        public DbSet<M_Material_Category> M_Material_Category { get; set; }
        public DbSet<M_Material_SubCategory> M_Material_SubCategory { get; set; }
        public DbSet<M_Material_Vendor> M_Material_Vendor { get; set; }
        public DbSet<M_Nation> M_Nation { get; set; }
        public DbSet<M_P_Article> M_P_Article { get; set; }
        public DbSet<M_Packing> M_Packing { get; set; }
        public DbSet<M_Payment_Terms> M_Payment_Terms { get; set; }
        public DbSet<M_Process> M_Process { get; set; }
        public DbSet<M_Product_Vendors> M_Product_Vendors { get; set; }
        public DbSet<M_Quality> M_Quality { get; set; }
        public DbSet<M_Quality_Market_Segment_Mapping> M_Quality_Market_Segment_Mapping { get; set; }
        public DbSet<M_Role> M_Role { get; set; }
        public DbSet<M_Role_Access_Function_Mapping> M_Role_Access_Function_Mapping { get; set; }
        public DbSet<M_State> M_State { get; set; }
        public DbSet<M_SubCategory> M_SubCategory { get; set; }
        public DbSet<M_Test_Unit> M_Test_Unit { get; set; }
        public DbSet<M_User> M_User { get; set; }
        public DbSet<M_User_Role_Mapping> M_User_Role_Mapping { get; set; }
        public DbSet<M_Vendor> M_Vendor { get; set; }
        public DbSet<M_W_Article> M_W_Article { get; set; }
        public DbSet<M_Work_Center> M_Work_Center { get; set; }
        public DbSet<M_Work_Center_Process> M_Work_Center_Process { get; set; }
        public DbSet<M_Work_Station> M_Work_Station { get; set; }
        public DbSet<M_Y_Article> M_Y_Article { get; set; }
        public DbSet<Staggered_Order> Staggered_Order { get; set; }
        public DbSet<System_Default> System_Default { get; set; }
        public DbSet<Temp_Visual_Parameters> Temp_Visual_Parameters { get; set; }
        public DbSet<M_Market_Segment> M_Market_Segment { get; set; }
        public DbSet<M_Defect> M_Defect { get; set; }
        public DbSet<M_Test> M_Test { get; set; }
        public DbSet<Temp_Functional_Parameters> Temp_Functional_Parameters { get; set; }
    }
}
