export const STR = {
  appName: 'FitPlan',
  estimateNote: 'Số liệu calo và TDEE là ước tính',
  kcalUnit: 'kcal',

  weekdayShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],

  status: {
    trained: 'Đã tập',
    rest: 'Nghỉ',
    skipped: 'Bỏ buổi',
    pending: 'Chưa báo cáo',
    future: 'Tương lai',
  },

  hero: {
    totalBurn: 'kcal đã đốt',
  },

  cards: {
    weight: 'Cân nặng cuối tuần',
    workout: 'Hôm đó tập gì?',
    meal: 'Khẩu phần gợi ý',
    task: 'Nhiệm vụ hôm nay',
    month: 'Tổng kết tháng',
    settings: 'Cài đặt',
  },

  workout: {
    activity: 'Bài tập',
    duration: 'Thời lượng (phút)',
    intensity: 'Cường độ',
    addSession: 'Thêm buổi',
    deleteSession: 'Xóa buổi',
    done: 'Đã hoàn thành các buổi tập',
    estKcal: 'kcal ước tính',
    reasonLabel: 'Lý do nghỉ',
    reasonPlaceholder: 'Ví dụ: đau chân, thi cử…',
    mainSession: 'Buổi chính',
    extraSession: 'Buổi phụ',
  },

  task: {
    sugar: 'Đường',
    oil: 'Dầu mỡ',
    oilNone: 'Không ăn',
    oilLow: 'Ăn ít',
    oilHigh: 'Nhiều',
    eat: 'Calo đã ăn',
    prot: 'Protein (g)',
    summarize: 'Tổng kết cuối ngày',
    resultTitle: 'Kết quả hôm nay',
    eatLabel: 'Calo ăn vào',
    outLabel: 'Tiêu hao',
    diffLabel: 'Chênh lệch',
    ok: 'Đạt',
    fail: 'Chưa đạt',
  },

  weight: {
    week: 'Tuần',
    enterWeight: 'Nhập cân (kg)',
    burn: 'kcal đốt',
    passDays: 'ngày đạt',
    diff: 'so tuần trước',
    prevMonth: 'Tháng trước',
    nextMonth: 'Tháng sau',
    adviceTitle: 'Gợi ý điều chỉnh',
    remind: 'Chưa đủ 2 số cân. Hãy cân đều vào mỗi cuối tuần, buổi sáng sau khi dậy.',
  },

  meal: {
    breakfast: 'Sáng',
    lunch: 'Trưa',
    dinner: 'Tối',
    snack: 'Phụ',
    target: 'Mục tiêu hôm nay',
  },

  month: {
    burn: 'kcal đốt từ tập',
    sessions: 'buổi tập',
    totalOut: 'Tổng tiêu hao',
    deficit: 'Thâm hụt tích lũy',
    fatKg: 'kg mỡ',
    passDays: 'ngày đạt',
  },

  settings: {
    base: 'BASE (kcal/ngày)',
    baseHint: 'Hoặc nhập chiều cao + tuổi để tự ước tính',
    height: 'Chiều cao (cm)',
    age: 'Tuổi',
    def: 'Thâm hụt mục tiêu (kcal)',
    goal: 'Cân nặng mục tiêu (kg)',
    sug: 'Giới hạn đường (g/ngày)',
    protMin: 'Protein tối thiểu (g)',
    alarm: 'Giờ báo cáo',
    export: 'Xuất JSON sao lưu',
    import: 'Nhập JSON',
    clear: 'Xóa toàn bộ dữ liệu',
    clearConfirm: 'Bạn chắc chắn muốn xóa toàn bộ dữ liệu?',
    save: 'Lưu cài đặt',
    estimate: 'Đây là ước tính, bạn có thể chỉnh lại.',
  },

  report: {
    notTrained: 'Chưa hoàn thành buổi tập',
    noEat: 'Chưa nhập calo ăn vào',
    overEat: (x: number) => `Ăn vượt chỉ tiêu ${x} kcal`,
    underEat: (x: number) => `Ăn thiếu ${x} kcal so với mục tiêu`,
    tooMuchSugar: 'Đường vượt mức cho phép',
    lowProt: 'Protein chưa đủ mức tối thiểu',
    tooMuchOil: 'Ăn quá nhiều dầu mỡ',
    restReasonTooShort: 'Ngày nghỉ cần nhập lý do từ 3 ký tự trở lên',
  },
} as const;
