using StackExchange.Redis;

namespace pa036.api.Redis
{
    public sealed class RedisManager
    {
        private static ConnectionMultiplexer _instance = null;
        private static readonly object _lockObject = new object();

        public static ConnectionMultiplexer Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lockObject)
                    {
                        if (_instance == null || !_instance.IsConnected)
                        {
                            _instance = ConnectionMultiplexer.Connect(RedisConstants.ServerUrl);
                        }
                    }
                }

                return _instance;
            }
        }

        public static IDatabase GetDatabase()
        {
            return Instance?.GetDatabase();
        }

        public static void RemoveCachedKeys()
        {
            var db = GetDatabase();
            foreach (var item in RedisConstants.CacheKeys)
            {
                db.KeyDelete(item.Value);
            }
        }
    }
}
