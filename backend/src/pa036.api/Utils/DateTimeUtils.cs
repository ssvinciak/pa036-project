using System;

namespace pa036.api.Utils
{
    public static class DateTimeUtils
    {
        public static double ToUnixSeconds(DateTime dateTime) => ((DateTimeOffset)dateTime).ToUnixTimeSeconds();
    }
}
