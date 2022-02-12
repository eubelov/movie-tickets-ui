<h2>Data sources</h2>
<div>
  <p>
    Data sources are configurable via the application's JSON config file.
    Currently, two data souces are supported: <b>cinemaworld</b> and
    <b>filmworld</b>.
  </p>
  <p>The following features can be configured for a data souce:</p>
  <ul>
    <li>
      <b>MaxConcurrency</b>: maximum number of concurrent requests that can be
      executed at any given time
    </li>
    <li><b>Timeout</b>: Reqeust timeout</li>
    <li><b>AccessToken</b>: Access token</li>
    <li><b>CacheTtl</b>: Response cache TTL</li>
  </ul>
</div>

<h2>Security</h2>
<div>
  <ul>
    <li>
      API tokens are securely stored in the <b>Azure Key Vault</b> and are never
      exposed to public
    </li>
    <li>
      All traffic goes through <b>Cloudflare</b> with WAF and rate-limiting enabled
    </li>
    <li>
      The backend is hosted in a <b>Kubernetes</b> cluster in <b>Azure</b>
      that only accepts connections originating from <b>Cloudflare</b>
    </li>
    <li>
      The UI is hosted in <b>Cloudflare Pages</b>
    </li>
  </ul>
</div>

<h2>Retries</h2>
<div>
  <p>
    There's a common retry logic implemented for all HTTP requests that either
    return a transient HTTP error (e.g. 500, 503, ...) or time out (408). The
    backend will retry the failed request as follows:
  </p>
  <ul>
    <li>Retry immediately 3 times</li>
    <li>Retry with an exponential backoff (e.g. in 1, 2 and 4) seconds</li>
  </ul>
  <p class="mt-2">
    If the request still fails after all attempted retries, the backend treats
    the data souce as unhealthy and ignores it.
  </p>
</div>
<h2>How individual movies are queried?</h2>
<div>
  <p>
    Once the list of movies is fetched, we start retrieving information about
    individual movies. This is done through a <b>bulkhead</b> policy that limits
    the number of parallel HTTP requests sent to the data souce as per its configuration.
    This is done to avoid swamping the downstream service with HTTP requests, thus
    rendering it unresponsive.
  </p>
</div>

<h2>Caching</h2>
<div>
  <p>
    Responses are cached if the <b>CacheTtl</b> setting of the data source is set
    to a non-default value.
  </p>
</div>

<style>
  h2 {
    color: #ff3e00;
    font-size: 2em;
    font-weight: 300;
  }
</style>
