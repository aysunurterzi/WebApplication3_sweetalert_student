using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxExample1.Controllers
{
    public class HomeController : Controller
    {
        AjaxExampleEntities db;
        public HomeController()
        {
            db = new AjaxExampleEntities();
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Veriler()
        {
            var veriler = db.TabloKullanicilar.ToList();
            return Json(
                new
                {
                    Result = from obj in veriler
                             select new
                             {
                                 obj.KullaniciId,
                                 AdSoyad = obj.Ad + " " + obj.Soyad,
                                 obj.Yas,
                             }
                }, JsonRequestBehavior.AllowGet
                );
        }
        [HttpPost]
        public JsonResult EkleJson(string ad, string soyad, int yas)
        {
            TabloKullanicilar klnc = new TabloKullanicilar();
            klnc.Ad = ad;
            klnc.Soyad = soyad;
            klnc.Yas = yas;
            db.TabloKullanicilar.Add(klnc);
            var durum =  db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
            }
            else
            { 
                return Json("0"); 
            }
        }
        [HttpPost]
        public JsonResult SilJson(int[] data)
        {
            foreach (var id in data)
            {
                var kullanici = db.TabloKullanicilar.FirstOrDefault(x => x.KullaniciId == id);
                db.TabloKullanicilar.Remove(kullanici);
            }
            var durum = db.SaveChanges();
            if (durum>0)
            {
                return Json("1");
            }
            else
            {
                return Json("0");
            }

        }
        [HttpPost]
        public JsonResult GuncelleJson(string id)
        {
            var Id = Convert.ToInt32(id);
            var veri = db.TabloKullanicilar.FirstOrDefault(x => x.KullaniciId == Id);
            return Json(
                new
                {
                    Result =  new
                             {
                                 Id,
                                 veri.Ad,
                                 veri.Soyad,
                                 veri.Yas
                             }
                }, JsonRequestBehavior.AllowGet
                );
        }
    
        public JsonResult Guncelle( string id ,string ad, string soyad, int yas)
        {
            var Id = Convert.ToInt32(id);
            var klnc = db.TabloKullanicilar.FirstOrDefault(x => x.KullaniciId == Id);

            klnc.Ad = ad;
            klnc.Soyad = soyad;
            klnc.Yas = yas;
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
            }
            else
            {
                return Json("0");
            }
        }
     
    }
}