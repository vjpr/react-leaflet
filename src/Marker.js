import React from "react";
import Leaflet from "leaflet";

import latlngType from "./types/latlng";
import PopupContainer from "./PopupContainer";

export default class Marker extends PopupContainer {

  constructor() {
    super();
    this.dragging = false;
  }

  componentWillMount() {
    super.componentWillMount();
    const {map, position, ...props} = this.props;
    this.leafletElement = Leaflet.marker(position, props);
    this.leafletElement.on("dragstart", event => {
      this.dragging = true;
    });
    this.leafletElement.on("dragend", event => {
      this.dragging = false;
    });
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.isPopupOpen) {
      this.leafletElement.openPopup()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isPopupOpen) {
      this.leafletElement.openPopup()
    }
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position);
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon);
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
    if (this.props.draggable !== prevProps.draggable) {
      this.leafletElement.draggable.enable();
    }
  }
}

Marker.propTypes = {
  position: latlngType.isRequired,
  icon: React.PropTypes.instanceOf(Leaflet.Icon),
  zIndexOffset: React.PropTypes.number,
  opacity: React.PropTypes.number,
  draggable: React.PropTypes.bool
};
