using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECommerce.BusinessLogics.Models
{
    public class ClassName : Attribute
    {
        public string Name { get; set; }

        public ClassName(string _name)
        {
            Name = _name;
        }
    }
         public static class AttributeExtensions
        {
            public static TValue GetAttributeValue<TAttribute,TValue>(this Type type, Func<TAttribute, TValue> valueSelector) where  TAttribute : Attribute
            {
                var att = type.GetCustomAttributes(typeof(TAttribute), true).FirstOrDefault() as TAttribute;
                if(att != null)
                {
                    return valueSelector(att);
                }
                return default(TValue);
            }
        
    }
}