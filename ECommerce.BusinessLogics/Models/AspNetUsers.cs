using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace ECommerce.BusinessLogics.Models
{
    [Table("AspNetUsers")]
    public class AspNetUsers : IdentityUser
    {
        public long StudentId { get; set; }
        public bool? IsSent { get; set; }
        public bool? IsLogIn { get; set; }
        public string Remarks { get; set; }
        public string Password { get; set; }
        public string SentBy { get; set; }
        public string FullName { get; set; }
        public string SentDateTime { get; set; }
        public string NormalizedUserName { get; set; }
        public string NormalizedEmail { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<AspNetUsers> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            //// Add custom user claims here
            //var Student = DataAccess.Instance.StudentBasicInfo.Get(StudentId);
            userIdentity.AddClaim(new Claim("StudentId", StudentId.ToString()));
            userIdentity.AddClaim(new Claim("FullName", FullName.ToString()));
            userIdentity.AddClaim(new Claim("UserName", UserName));

            return userIdentity;
        }
    }

}