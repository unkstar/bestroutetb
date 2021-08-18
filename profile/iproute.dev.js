module.exports = function(Formatter) {

function IpRouteDevUpFormatter() {
  Formatter.apply(this, arguments);
  this.footer='FILE\nip ro r default dev '+ this.gateway.vpn;
}

$inherit(IpRouteDevUpFormatter, Formatter, {
  header: '#!/bin/sh\nip -b - <<FILE\n',
  ruleFormat: 'r a %prefix/%length dev %gw\n'
});

function IpRouteDevDownFormatter() {
  Formatter.apply(this, arguments);
  this.footer='FILE\nip ro a default dev '+ this.gateway.net;
}

$inherit(IpRouteDevDownFormatter, Formatter, {
  header: '#!/bin/sh\nip -b - <<FILE\n',
  ruleFormat: 'r d %prefix/%length dev %gw\n'
});

return {
  'up.sh': {
    mode: 0777,
    Formatter: IpRouteDevUpFormatter
  },
  'down.sh': {
    mode: 0777,
    Formatter: IpRouteDevDownFormatter
  }
};

};
