var feedsWidgetNs = feedsWidgetNs || {};
feedsWidgetNs.feedsWidget = function(publisherId, apiKey, sourceId) {
    this.publisherId = publisherId;
    this.apiKey = apiKey;
    this.sourceId = sourceId;

    return {
        render: render.bind(this)
    };

    function render(feedsContainerElementId, feedsCount, feedsViewType) {
        getFeeds(window.innerWidth, this.publisherId, this.apiKey, this.sourceId, feedsCount, onGetFeedsResolved, onGetFeedsRejected);
        
        function onGetFeedsResolved(feeds) {
            try {
                if (feeds.length == 0) {
                    showEmptyState(feedsContainerElementId);
                    return;
                }
        
                showFeeds(feeds, feedsContainerElementId, feedsViewType);
            } catch(err) {
                onError(err);
            }
        }
    
        function onGetFeedsRejected(err) {
            onError(err);
        }
    }

    function getFeeds(windowInnerWidth, publisherId, apiKey, sourceId, feedsCount, resolve, reject) {
        var deviceType = getDeviceType(windowInnerWidth);
        
        var xhr; 
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var feedsUrl = getFeedsUrl(publisherId, deviceType, apiKey, sourceId, feedsCount);
        xhr.open("GET", feedsUrl);
        
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status != 200) {
                    reject(`Can't connect to Taboola's feeds endpoint`);
                    return;  
                } 
    
                var response = JSON.parse(xhr.responseText);
                if (response.list == null || response.list.length == 0) {
                    resolve([]);
                    return;    
                }
    
                var feeds = convertFeedsResponse(response.list);
                resolve(feeds);
            }
        });

        xhr.send();
    }

    function getFeedsUrl(publisherId, deviceType, apiKey, sourceId, feedsCount) {
        return [
            'http://api.taboola.com/1.0/json/',
            publisherId,
            '/recommendations.get',
            '?app.type=',
            deviceType,
            '&app.apikey=',
            apiKey,
            '&source.id=',
            sourceId,
            '&count=',
            feedsCount,
            '&source.url=http://www.site.com/videos/214321562187.html&source.type=video'
        ].join('');
    }

    function convertFeedsResponse(feedsResponse) {
        var feeds = [];
        var feedFactory = new feedsWidgetNs.feedFactory();
        for (var i = 0; i < feedsResponse.length; i++) {
            var feed = feedFactory.create(feedsResponse[i]);
            feeds.push(feed);
        }

        return feeds;
    }

    function showFeeds(feeds, feedsContainerElementId, feedsViewType) {
        var documentFragment = document.createDocumentFragment();

        var container = document.createElement("div");
        container = documentFragment.appendChild(container);
        container.className = "fw-main-container";

        var feedHtmlFactory = new feedsWidgetNs.feedHtmlFactory();
        for (var i = 0; i < feeds.length; i++) {
            var feedHtmlContent = feedHtmlFactory.create(feedsViewType, feeds[i]);
            container.appendChild(feedHtmlContent);
        }

        var feedsContainer = document.getElementById(feedsContainerElementId);
        feedsContainer.appendChild(documentFragment);
    }

    function getDeviceType(windowInnerWidth) {
        return windowInnerWidth <= 800 ? feedsWidgetNs.DeviceTypes.mobile : feedsWidgetNs.DeviceTypes.desktop;
    }

    function onError(err) {
        console.error(err);
    }

    function showEmptyState(feedsContainerElementId) {
        var documentFragment = document.createDocumentFragment();
        var empatyStateMsg = document.createElement("span");
        empatyStateMsg = documentFragment.appendChild(empatyStateMsg);
        empatyStateMsg.className = 'fw-empty-state';
        empatyStateMsg.innerText = 'No feeds for you';

        var feedsContainer = document.getElementById(feedsContainerElementId);
        feedsContainer.appendChild(documentFragment);
    }
}