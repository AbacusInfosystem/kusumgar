﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kusumgar.Models; 
using KusumgarBusinessEntities;

using KusumgarModel;
using KusumgarBusinessEntities.Common;
using KusumgarHelper.PageHelper;
using KusumgarCrossCutting.Logging;

namespace Kusumgar.Controllers
{
    public class MaterialController : Controller
    {
        //
        // GET: /Material/

        public MaterialManager _materialMan;

        public MaterialController()
        {
            _materialMan = new MaterialManager();
        }

        public ActionResult Index(MaterialViewModel mViewModel)
        {
            ViewBag.Title = "KPCL ERP :: Create, Update";

            PaginationInfo pager = new PaginationInfo();

            try
            {
                pager.IsPagingRequired = false;
                mViewModel.Material_Categories = _materialMan.Get_Material_Categories(ref pager);
                mViewModel.Material_SubCategories = _materialMan.Get_Material_SubCategories(mViewModel.Material.Material_Category_Id, ref pager);

                mViewModel.Is_Primary = false;
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return View("Index", mViewModel);
        }

        public ActionResult Search(MaterialViewModel mViewModel)
        {

            ViewBag.Title = "KPCL ERP :: Search";

            PaginationInfo pager = new PaginationInfo();
            if (TempData["mViewModel"] != null)
            {
                mViewModel = (MaterialViewModel)TempData["mViewModel"];
            }
            pager = mViewModel.Pager;
            return View("Search", mViewModel);
        }

        public JsonResult Insert(MaterialViewModel mViewModel)
        {
            try
            {
                mViewModel.Material.CreatedBy = ((UserInfo)Session["User"]).UserId;
                mViewModel.Material.UpdatedBy = ((UserInfo)Session["User"]).UserId;
                mViewModel.Material.CreatedOn = DateTime.Now;
                mViewModel.Material.UpdatedOn = DateTime.Now;
                mViewModel.Material.Material_Id = _materialMan.Insert_Material(mViewModel.Material);
                mViewModel.Friendly_Message.Add(MessageStore.Get("M001"));
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Json(mViewModel);
        }

        public JsonResult Update(MaterialViewModel mViewModel)
        {
            try
            {
                mViewModel.Material.UpdatedBy = ((UserInfo)Session["User"]).UserId;
                mViewModel.Material.UpdatedOn = DateTime.Now;
                _materialMan.Update_Material(mViewModel.Material);
                mViewModel.Friendly_Message.Add(MessageStore.Get("M002"));
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Json(mViewModel);
        }

        public JsonResult Get_Materials(MaterialViewModel mViewModel)
        {
            PaginationInfo pager = new PaginationInfo();
            pager = mViewModel.Pager;
            try
            {
                if (mViewModel.Filter.Material_Id != 0 && mViewModel.Filter.Vendor_Id != 0)
                {
                    mViewModel.Materials = _materialMan.Get_Materials_By_Material_Id_Vendor_Id(mViewModel.Filter.Material_Id, mViewModel.Filter.Vendor_Id, ref pager);
                }
                else if (mViewModel.Filter.Material_Id != 0)
                {
                    mViewModel.Materials = _materialMan.Get_Materials_By_Material_Id(mViewModel.Filter.Material_Id, ref pager);
                }
                else if (mViewModel.Filter.Vendor_Id != 0)
                {
                    mViewModel.Materials = _materialMan.Get_Materials_By_Vendor_Id(mViewModel.Filter.Vendor_Id, ref pager);
                }
                else
                {
                    mViewModel.Materials = _materialMan.Get_Materials(ref pager);
                }
                mViewModel.Pager.PageHtmlString = PageHelper.NumericPager("javascript:PageMore({0})", mViewModel.Pager.TotalRecords, mViewModel.Pager.CurrentPage + 1, mViewModel.Pager.PageSize, 10, true);
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Json(mViewModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Get_Material_By_Id(MaterialViewModel mViewModel)
        {
            PaginationInfo pager = new PaginationInfo();
            try
            {
                mViewModel.Material = _materialMan.Get_Material_By_Id(mViewModel.Material_Id);
                mViewModel.Material_Vendors = _materialMan.Get_Material_Vendors_By_Id(mViewModel.Material_Id);
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Index(mViewModel);
        }

        public JsonResult Get_Material_SubCategory_By_Category_Id(int Material_Category_Id)
        {
            List<MaterialSubCategoryInfo> Material_SubCategories = new List<MaterialSubCategoryInfo>();
            try
            {
                PaginationInfo pager = new PaginationInfo();
                pager.IsPagingRequired = false;
                Material_SubCategories = _materialMan.Get_Material_SubCategories(Material_Category_Id, ref pager);
            }
            catch (Exception ex)
            {

            }
            return Json(Material_SubCategories, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_Materials_By_Name_Autocomplete(string Material_Name)
        {
            List<AutocompleteInfo> autoList = new List<AutocompleteInfo>();
            autoList = _materialMan.Get_Materials_By_Name_Autocomplete(Material_Name);
            return Json(autoList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insert_Material_Vendor(MaterialViewModel mViewModel)
        {
            PaginationInfo pager = new PaginationInfo();
            try
            {
                mViewModel.Material_Vendor.Material_Vendor_Id = _materialMan.Insert_Material_Vendor(mViewModel.Material_Vendor);
                mViewModel.Friendly_Message.Add(MessageStore.Get("M003"));
                mViewModel.Material_Vendors = _materialMan.Get_Material_Vendors_By_Id(mViewModel.Material_Vendor.Material_Id);                
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Json(mViewModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete_Material_Vendor_By_Id(int Material_Vendor_Id, MaterialViewModel mViewModel)
        {
            try
            {
                _materialMan.Delete_Material_Vendor_By_Id(Material_Vendor_Id);
                mViewModel.Friendly_Message.Add(MessageStore.Get("M004"));
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
            }
            return Json(mViewModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get_Vendor_Autocomplete(string vendor_Name)
        {
            List<AutocompleteInfo> autoList = new List<AutocompleteInfo>();
            autoList = _materialMan.Get_Vendor_Autocomplete(vendor_Name);
            return Json(autoList, JsonRequestBehavior.AllowGet);
        }

        //
        //public ActionResult Get_Materials_By_Vendor_Id(MaterialViewModel mViewModel)
        //{
        //    PaginationInfo pager = new PaginationInfo();
        //    try
        //    {
        //        //mViewModel.Material = _materialMan.Get_Material_By_Id(mViewModel.Material_Id);

        //        //mViewModel.Material_Vendors = _materialMan.Get_Material_Vendors_By_Id(mViewModel.Material_Id, ref pager);
        //    }
        //    catch (Exception ex)
        //    {
        //        mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));
        //    }
        //    return Index(mViewModel);
        //}


        public ActionResult View_Material(MaterialViewModel mViewModel)
        {
            ViewBag.Title = "KPCL ERP :: Search";

            PaginationInfo pager = new PaginationInfo();
            try
            {
                mViewModel.Material = _materialMan.Get_Material_By_Id(mViewModel.Material_Id);

                mViewModel.Material_Vendors = _materialMan.Get_Material_Vendors_By_Id(mViewModel.Material_Id);

                VendorManager _vendorMan = new VendorManager();

                mViewModel.Vendor_Grid = _vendorMan.Get_Vendors_By_Material_Id(mViewModel.Material_Id, ref  pager);

            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));

                Logger.Error("Material Controller - View_Material " + ex.ToString());
            }

            return View("View", mViewModel);
        }

        public PartialViewResult Printable_Material(MaterialViewModel mViewModel)
        {
            ViewBag.Title = "KPCL ERP :: Print";

            PaginationInfo pager = new PaginationInfo();

            try
            {
                mViewModel.Material = _materialMan.Get_Material_By_Id(mViewModel.Material_Id);

                mViewModel.Material_Vendors = _materialMan.Get_Material_Vendors_By_Id(mViewModel.Material_Id);

                VendorManager _vendorMan = new VendorManager();

                mViewModel.Vendor_Grid = _vendorMan.Get_Vendors_By_Material_Id(mViewModel.Material_Id, ref  pager);
            }
            catch (Exception ex)
            {
                mViewModel.Friendly_Message.Add(MessageStore.Get("SYS01"));

                Logger.Error("Material Controller - Printable_Material " + ex.ToString());
            }

            return PartialView("_PrintableView", mViewModel);
        }

    }
}
