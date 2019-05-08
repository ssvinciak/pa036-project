using System;

namespace pa036.api.Utils
{
    public static class DateTimeExtensions
    {
        public static double ToUnixSeconds(this DateTime dateTime)
        {
            return ((DateTimeOffset)dateTime).ToUnixTimeSeconds();
        }
    }
}
