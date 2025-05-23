let chartData = [];
const labels = [];
const ctx = document.getElementById('depthChart').getContext('2d');
const connectButton = document.getElementById('connectButton');
const loading = document.getElementById('loading');
const groundMarker = document.getElementById('groundMarker');
const canvas = document.getElementById('depthChart');

const fishImage = new Image();
fishImage.src = 'fish.svg';

let groundLevel = null;
let lastDepth = null;
let repeatedDepthStartTime = null;

const depthChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Fish Depth (cm)',
      data: chartData,
      borderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0)',
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointRadius: 0,
      borderWidth: 0,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Time (s)' },
        ticks: { maxTicksLimit: 10 }
      },
      y: {
        title: { display: true, text: 'Depth (cm)' },
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + ' cm';
          }
        }
      }
    },
    plugins: {
      legend: { display: false },
    }
  },
  plugins: [{
    id: 'fishImagePlugin',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      dataset.data.forEach((depth, index) => {
        const x = chart.scales.x.getPixelForValue(index);
        const y = chart.scales.y.getPixelForValue(depth);
        if (!isNaN(x) && !isNaN(y)) {
          ctx.drawImage(fishImage, x - 15, y - 15, 30, 30);
        }
      });
    }
  }]
});

function updateYAxisMax() {
  const maxDepth = Math.max(...chartData);
  const roundedMax = Math.ceil(maxDepth / 50) * 50;
  let yMax;
  if (groundLevel !== null) {
    yMax = groundLevel;
  } else if (roundedMax > 400) {
    yMax = 400;
  } else {
    yMax = roundedMax;
  }
  depthChart.options.scales.y.max = yMax;
  depthChart.update();
}

function showGroundMarker() {
  const chartY = depthChart.scales.y.getPixelForValue(groundLevel);
  groundMarker.style.top = `${canvas.offsetTop + chartY - 15}px`;
  groundMarker.style.left = `${canvas.offsetLeft + canvas.width / 2 - 50}px`;
  groundMarker.style.display = 'block';
}

connectButton.addEventListener('click', async () => {
  try {
    loading.style.display = 'block';
    connectButton.disabled = true;

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
    const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

    characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      const value = new TextDecoder().decode(event.target.value);
      if (!value.includes('cm')) return;

      const depth = parseFloat(value.split('Depth: ')[1].split(' cm')[0]);
      if (isNaN(depth) || depth > 400) return;
      if (groundLevel !== null && depth >= groundLevel) return;

      if (handleRepeatedDepth(depth)) return;

      chartData.push(depth);
      labels.push(chartData.length);
      if (chartData.length > 20) {
        chartData.shift();
        labels.shift();
      }

      updateYAxisMax();
    });

    function handleRepeatedDepth(depth) {
      const now = Date.now();

      if (depth === lastDepth) {
        if (!repeatedDepthStartTime) {
          repeatedDepthStartTime = now;
        } else if (now - repeatedDepthStartTime >= 5000 && groundLevel === null) {
          groundLevel = depth;
          alert(`Ground level detected at ${groundLevel} cm.`);
          updateYAxisMax();
          showGroundMarker();
          return true;
        }
      } else {
        lastDepth = depth;
        repeatedDepthStartTime = now;
      }
      return false;
    }

  } catch (error) {
    console.error('Bluetooth Error:', error);
    alert('Bluetooth connection failed.');
  } finally {
    loading.style.display = 'none';
  }
});
