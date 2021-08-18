module.exports = function(Formatter) {

function IpRouteUpFormatter() {
  Formatter.apply(this, arguments);
  this.footer='FILE\nip ro r default via '+ this.gateway.vpn;
}

$inherit(IpRouteUpFormatter, Formatter, {
  header: '#!/bin/sh\nip -b - <<FILE\n',
  ruleFormat: 'r a %prefix/%length via %gw\n'
});

function IpRouteDownFormatter() {
  Formatter.apply(this, arguments);
  this.footer='FILE\nip ro a default via '+ this.gateway.net;
}

$inherit(IpRouteDownFormatter, Formatter, {
  header: '#!/bin/sh\nip -b - <<FILE\n',
  ruleFormat: 'r d %prefix/%length via %gw\n'
});

return {
  'up.sh': {
    mode: 0777,
    Formatter: IpRouteUpFormatter
  },
  'down.sh': {
    mode: 0777,
    Formatter: IpRouteDownFormatter
  }
};

};
