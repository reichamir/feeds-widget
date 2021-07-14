var feedsWidgetNs = feedsWidgetNs || {};
feedsWidgetNs.feedHtmlFactory = function() {
    return {
        create: create.bind(this) 
    };

    function create(feedViewType, feedData) {
        var feedView;
        switch(feedViewType) {
            case feedsWidgetNs.FeedViewTypes.column: 
                feedView = getColumnView(feedData);
                break;
            case feedsWidgetNs.FeedViewTypes.twoColumns: 
                feedView = getTwoColumnsView(feedData);
                break;
            case feedsWidgetNs.FeedViewTypes.imageCaption: 
                feedView = getImageCapationView(feedData);
                break;
            default:
                throw 'Unknown feed view type: ' + feedResponse.origin; 
                break;
        }
    
        return feedView;
    }

    function getColumnView(feedData) {
        var containerLink = document.createElement("a");
        containerLink.href = feedData.url;
        if (feedData.isOpenInNewTab) {
            containerLink.target = "_blank";
        }
        containerLink.className = "fw-feed-column-view";
    
        var thumbnail = document.createElement("span");
        thumbnail.className= "fw-feed-thumbnail";
        thumbnail.style.backgroundImage = "url('" + feedData.thumbnail + "')";
        containerLink.appendChild(thumbnail);
    
        var caption = document.createElement("span");
        caption.className = 'fw-feed-caption';
        caption.innerText = feedData.caption;
        containerLink.appendChild(caption);
    
        if (feedData instanceof feedsWidgetNs.SponsoredFeed) {
            var sponserText = document.createElement("span");
            sponserText.className = 'fw-feed-sponser';
            sponserText.innerText = feedData.sourceRecommendationName;
            containerLink.appendChild(sponserText);
        }
    
        return containerLink;
    }
    
    function getTwoColumnsView(feedData) {
        var containerLink = document.createElement("a");
        containerLink.href = feedData.url;
        if (feedData.isOpenInNewTab) {
            containerLink.target = "_blank";
        }
        containerLink.className = "fw-feed-two-columns-view";
    
        var thumbnail = document.createElement("div");
        thumbnail.className= "fw-feed-thumbnail";
        thumbnail.style.backgroundImage = "url('" + feedData.thumbnail + "')";
        containerLink.appendChild(thumbnail);

        var colTwo = document.createElement("div");
        colTwo.className= "fw-feed-col-two";
        containerLink.appendChild(colTwo);
    
        var caption = document.createElement("span");
        caption.className = 'fw-feed-caption';
        caption.innerText = feedData.caption;
        colTwo.appendChild(caption);
    
        if (feedData instanceof feedsWidgetNs.SponsoredFeed) {
            var sponserText = document.createElement("span");
            sponserText.className = 'fw-feed-sponser';
            sponserText.innerText = feedData.sourceRecommendationName;
            colTwo.appendChild(sponserText);
        }
    
        return containerLink;   
    }
}


